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
};

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectIdCache = new Map<string, number[]>();
const objectCache = new Map<number, MetObject>();

export async function fetchMetObjectIds(query: string): Promise<number[]> {
  if (objectIdCache.has(query)) {
    return objectIdCache.get(query) ?? [];
  }

  const response = await fetch(`${BASE_URL}/search?hasImages=true&q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Unable to load object IDs from The Met API");
  }

  const payload = (await response.json()) as { objectIDs?: number[] | null };
  const ids = payload.objectIDs ?? [];
  objectIdCache.set(query, ids);
  return ids;
}

export async function fetchMetObject(objectId: number): Promise<MetObject | null> {
  if (objectCache.has(objectId)) {
    return objectCache.get(objectId) ?? null;
  }

  const response = await fetch(`${BASE_URL}/objects/${objectId}`);
  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as MetObject;
  if (!payload?.objectID || !(payload.primaryImageSmall || payload.primaryImage)) {
    return null;
  }

  objectCache.set(objectId, payload);
  return payload;
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
