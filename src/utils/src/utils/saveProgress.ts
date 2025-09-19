export async function loadQuests(questIds: string[]) {
  return Promise.all(questIds.map(id => fetch(`/quests/${id}.json`).then(res => res.json())));
}
