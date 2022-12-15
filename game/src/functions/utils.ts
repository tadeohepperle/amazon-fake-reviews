export function rating_to_star_class(rating: number): string {
  return [
    "a-star-1",
    "a-star-1-5",
    "a-star-2",
    "a-star-2-5",
    "a-star-3",
    "a-star-3-5",
    "a-star-4",
    "a-star-4-5",
    "a-star-5",
  ][Math.round((rating - 1) * 2)];
}

export function rating_to_star_class_medium(rating: number): string {
  return [
    "a-star-medium-1",
    "a-star-medium-1-5",
    "a-star-medium-2",
    "a-star-medium-2-5",
    "a-star-medium-3",
    "a-star-medium-3-5",
    "a-star-medium-4",
    "a-star-medium-4-5",
    "a-star-medium-5",
  ][Math.round((rating - 1) * 2)];
}

export function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
