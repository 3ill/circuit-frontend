import { ethers } from 'ethers'
import { tokenABI } from './tokenAbi'
import { TOKEN_ADDRESS } from './keys'

export const getBalance = async (address: string) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const surge = new ethers.Contract(TOKEN_ADDRESS, tokenABI, signer)

    try {
      const balance = await surge.balanceOf(address)

      const formattedBalance = ethers.utils.formatUnits(balance)

      return formattedBalance.toString()
    } catch (error) {
      console.error(error)
    }
  } else {
    throw new Error(
      'Web3 provider not available. Please connect or install wallet like MetaMask.',
    )
  }
}
