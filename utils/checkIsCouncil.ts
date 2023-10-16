import { ethers } from 'ethers'
import { abi } from './abi'
import { contract_address } from './keys'

type Props = {
  memberAddress: string
}

export const checkIsCouncil = async ({ memberAddress }: Props) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const circuit = new ethers.Contract(contract_address, abi, signer)

    try {
      const isCouncil = await circuit.checkIsCouncilMember(memberAddress)
      if (isCouncil === true) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return 'An error occurred'
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
