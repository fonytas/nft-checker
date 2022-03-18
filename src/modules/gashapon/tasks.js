import { createReduxAsyncTask } from '@makejack4/redux-saga-toolkit'
import { put } from '@redux-saga/core/effects'

import { MODULE_NAME } from './types'
import {gashaponContract} from "../../config/data/contracts/gashapon-contract";
import {getRpcProvider} from "../../helpers/ethers";
import {toUriNFTsContract} from "../../helpers/to-uri-nft-contract";
import axios from "axios";
import findTypeId from "../../helpers/find-type-id";

export const getGashaponRewardByPageTask = createReduxAsyncTask({
    moduleName: MODULE_NAME,
    name: 'getGashaponRewardByPage',
    defaultData: {},
    defaultPayload: { gashaponId: '' },
    saga: ({ actions }) =>
        function* ({ payload }) {
            try {
                const { gashaponId } = payload
                const { rpcProvider } = getRpcProvider()

                const gashaponHelperContract = gashaponContract.connect(rpcProvider)

                let currentPage = 1

                const limit = 500

                let defaultTypeId = undefined

                const typeIds = []
                const temp = {}

                while (true) {
                    const gashaponRewardNextResponse = yield gashaponHelperContract.getGashaponRewardByPage(gashaponId, (currentPage * limit) + 1, 1)
                    const gashaponRewardResponse = yield gashaponHelperContract.getGashaponRewardByPage(gashaponId, currentPage, limit)
                    const nftTokenRewardAddress = gashaponRewardResponse.nftTokenRewardAddress?.[0]
                    const nftTokenRewardId = gashaponRewardResponse.nftTokenRewardId

                    for (let i = 0; i < nftTokenRewardId.length; i += 1) {
                        const currentTokenId = nftTokenRewardId[i].toString()
                        const typeId = findTypeId(currentTokenId)
                        const current = temp[typeId] || []

                        if (typeId !== defaultTypeId) {
                            typeIds.push(typeId)
                            const uri = yield toUriNFTsContract(nftTokenRewardAddress, currentTokenId.toString())
                            if (uri) {
                                const { data } = yield axios.get(uri)
                                current.push(data)
                            }
                            temp[typeId] = current
                        } else {
                            current.push(undefined)
                            temp[typeId] = current
                        }
                        defaultTypeId = typeId
                    }
                    currentPage += 1

                    if (gashaponRewardNextResponse.nftTokenRewardId?.length < 1) {
                        break
                    }
                }
                yield put(actions.success(temp))
            } catch (error) {
                yield put(actions.failure(error))
            }
        },
})

