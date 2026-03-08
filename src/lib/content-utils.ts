export type ExhibitionStatus = "Upcoming" | "Ongoing" | "Past";

export function getExhibitionStatus(start: string, end: string): ExhibitionStatus {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) {
    return "Upcoming";
  }

  if (now > endDate) {
    return "Past";
  }

  return "Ongoing";
}

export function sortByStartDesc<T extends { start: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
}
