/* eslint-disable no-throw-literal */
import * as ethers from 'ethers'
import { getChainNetworkSetting } from '../config/chain-network-rpc-setting'

export const getRpcProvider = () => {
    const chainNetworkSetting = getChainNetworkSetting()

    const rpcProvider = new ethers.providers.JsonRpcProvider(chainNetworkSetting.RPC_URL)
    return {
        rpcProvider,
    }
}

