import { connectMeeToken } from '@meechain/config/provider'

export async function getTotalSupply() {
  const { instance } = await connectMeeToken()
  const v = await instance.totalSupply()
  return v.toString()
}

export async function mint(to: string, amount: string) {
  const { instance, helpers } = await connectMeeToken()
  const tx = await instance.mint(to, helpers.parse(amount))
  await tx.wait()
}

export async function transfer(to: string, amount: string) {
  const { instance, helpers } = await connectMeeToken()
  const tx = await instance.transfer(to, helpers.parse(amount))
  await tx.wait()
}
