import { createPublicClient, http } from 'viem';
import { hardhat } from 'viem/chains';
import { abi } from '../artifacts/contracts/Greeter.sol/Greeter.json';

const client = createPublicClient({
  chain: hardhat,
  transport: http(),
});

async function main() {
  const greeting = await client.readContract({
    address: '0xYourContractAddress',
    abi,
    functionName: 'greet',
  });

  console.log('Greeting:', greeting);
}

main();
