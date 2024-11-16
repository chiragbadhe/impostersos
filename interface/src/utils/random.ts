export function generateRandomNumber(limit?: number) {
  return Math.floor(Math.random() * (limit ?? 1));
}
