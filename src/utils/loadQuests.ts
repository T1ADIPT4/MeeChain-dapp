export function saveProgress(userId: string, network: string, questId: string, status: string) {
  const key = `${userId}:${network}:${questId}`;
  localStorage.setItem(key, status);
}
