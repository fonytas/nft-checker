import { mainnet as bkcMainnet, testnet as bkcTestnet } from './data/rpc-network/bkc'

export const getChainNetworkSetting = () => {
    return process.env.REACT_APP_APP_ENV === 'production' ? bkcMainnet : bkcTestnet
}
