export type MetObject = {
  objectID: number;
  title: string;
  primaryImage: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  objectDate: string;
  period: string;
  medium: string;
  department: string;
  objectName: string;
  culture: string;
  tags?: string[];
};

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const memoryCacheIds = new Map<string, number[]>();
const memoryCacheObjects = new Map<number, MetObject>();

// Strict Rate Limiter: max 80 requests per second
class RateLimiter {
  private queue: Array<() => void> = [];
  private tokens = 80;
  private readonly MAX_TOKENS = 80;
  private readonly REFILL_RATE_MS = 1000 / 80; // 1 token every 12.5ms
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.intervalId = setInterval(() => this.refill(), this.REFILL_RATE_MS);
    } else {
      // In SSR we still need the interval, using globalThis.setInterval
      this.intervalId = globalThis.setInterval(() => this.refill(), this.REFILL_RATE_MS);
    }
  }

  private refill() {
    if (this.tokens < this.MAX_TOKENS) {
      this.tokens++;
    }
    this.processQueue();
  }

  private processQueue() {
    while (this.queue.length > 0 && this.tokens > 0) {
      this.tokens--;
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }

  async acquireToken(): Promise<void> {
    if (this.tokens > 0) {
      this.tokens--;
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }
}

const rateLimiter = new RateLimiter();

function getSessionCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setSessionCache<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage limits
  }
}

let cachedArtifacts: MetObject[] | null = null;

async function loadStaticArtifacts(): Promise<MetObject[]> {
  if (cachedArtifacts) return cachedArtifacts;
  try {
    const res = await fetch('/data/artifacts_master.json');
    if (!res.ok) return [];
    let data: MetObject[] = await res.json();
    
    // Clean up extremely long titles
    data = data.map(a => {
        if (a.title && a.title.includes(';')) {
            const parts = a.title.split(';');
            if (parts[0].length > 10) a.title = parts[0];
        }
        return a;
    });
    
    cachedArtifacts = data;
    return cachedArtifacts || [];
  } catch (e) {
    console.error("Failed to load static artifacts:", e);
    return [];
  }
}

export async function fetchMetObjectIds(params: { q?: string; departmentId?: string; medium?: string; culture?: string; geo?: string; artistOrCulture?: boolean }): Promise<number[]> {
  const artifacts = await loadStaticArtifacts();
  
  let filtered = artifacts;
  
  if (params.q && params.q !== "*") {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(a => 
      a.title?.toLowerCase().includes(q) || 
      a.artistDisplayName?.toLowerCase().includes(q) ||
      a.medium?.toLowerCase().includes(q)
    );
  }
  
  if (params.departmentId) {
    const dId = parseInt(params.departmentId, 10);
    // Map ID to Name using the Met API exactly as the UI gets them
    try {
        const depts = await fetchDepartments();
        const dMatch = depts.find(d => d.departmentId === dId);
        if (dMatch) {
            const nameMap: Record<string, string> = {
                "American Decorative Arts": "The American Wing",
                "Ancient West Asian Art": "Ancient Near Eastern Art",
            };
            const mappedName = nameMap[dMatch.displayName] || dMatch.displayName;
            filtered = filtered.filter(a => a.department === mappedName || a.department === dMatch.displayName);
        }
    } catch(e) {}
  }
  
  if (params.medium) {
    const m = params.medium.toLowerCase();
    const terms = m.split('|').map(t => t.trim());
    filtered = filtered.filter(a => {
        const mLower = a.medium?.toLowerCase() || '';
        return terms.some(t => mLower.includes(t));
    });
  }
  
  if (params.culture) {
    const c = params.culture.toLowerCase();
    filtered = filtered.filter(a => a.culture?.toLowerCase().includes(c));
  }
  
  if (params.geo) {
    const g = params.geo.toLowerCase();
    filtered = filtered.filter(a => 
      a.country?.toLowerCase().includes(g) || 
      a.region?.toLowerCase().includes(g) ||
      a.city?.toLowerCase().includes(g)
    );
  }

  return filtered.map(a => a.objectID);
}

export async function fetchMetObject(objectId: number): Promise<MetObject | null> {
  const artifacts = await loadStaticArtifacts();
  return artifacts.find(a => a.objectID === objectId) || null;
}

export async function fetchDepartments(): Promise<{ departmentId: number; displayName: string }[]> {
  const cacheKey = `met_departments`;
  const sessionData = getSessionCache<{ departmentId: number; displayName: string }[]>(cacheKey);
  if (sessionData) return sessionData;

  await rateLimiter.acquireToken();
  try {
    const response = await fetch(`${BASE_URL}/departments`);
    if (!response.ok) return [];
    const payload = await response.json();
    const depts = payload.departments || [];
    setSessionCache(cacheKey, depts);
    return depts;
  } catch {
    return [];
  }
}

export function getPageSlice<T>(items: T[], page: number, pageSize: number): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getSpreadPageSlice<T>(items: T[], page: number, pageSize: number, step: number): T[] {
  const safePage = Math.max(1, page);
  const result: T[] = [];
  const pageStart = (safePage - 1) * pageSize * step;

  for (let index = 0; index < pageSize; index += 1) {
    const spreadIndex = pageStart + index * step;
    const fallbackIndex = (safePage - 1) * pageSize + index;
    const candidate = items[spreadIndex] ?? items[fallbackIndex];
    if (candidate !== undefined) {
      result.push(candidate);
    }
  }

  return result;
}
