import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

type MintSurgeProps = {
  value: number
}

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
export const mintSurge = async ({ value }: MintSurgeProps) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const circuit = new ethers.Contract(contract_address, abi, signer)
    try {
      const mint = await circuit.mintSurge(value)
      await mint.wait()
      return `Successfully minted ${value} SURGE`
    } catch (error) {
      console.error(error)
      return 'Mint Failed'
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
