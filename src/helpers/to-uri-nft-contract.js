import * as ethers from 'ethers'
import {getRpcProvider} from "./ethers";

export const toUriNFTsContract = async (nftAddress, tokenId) => {
    const { rpcProvider } = await getRpcProvider()

    const unknownContract = new ethers.Contract(
        nftAddress,
        ['function tokenURI(uint256 tokenId) external view returns (string memory)'],
        rpcProvider,
    )
    return await unknownContract.tokenURI(tokenId)
}
