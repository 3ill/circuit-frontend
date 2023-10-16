import { contract_address } from './keys'
import { ethers } from 'ethers'
import { abi } from './abi'
import { hexToNumber } from 'viem'

export const getAdminCount = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const circuit = new ethers.Contract(contract_address, abi, signer)
    try {
      const count = await circuit.adminCounter()
      const manualCount = hexToNumber(count)
      return manualCount
    } catch (error) {
      return error
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
