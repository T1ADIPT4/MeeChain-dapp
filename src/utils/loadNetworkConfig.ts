export async function loadNetworkConfig(network: string) {
  const res = await fetch(`/configs/${network}.json`);
  if (!res.ok) throw new Error("Network config not found");
  return await res.json();
}
