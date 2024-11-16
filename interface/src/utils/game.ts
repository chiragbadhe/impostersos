export function generateRandomPlayerIndex(players: number) {
  if (!players || players < 2 || players > 6) return 0;
  return Math.floor(Math.random() * players);
}
