import { createReduxAsyncTask } from '@makejack4/redux-saga-toolkit'
import { put } from '@redux-saga/core/effects'

import { MODULE_NAME } from './types'

export const testTask = createReduxAsyncTask({
    moduleName: MODULE_NAME,
    name: 'test',
    defaultData: {},
    saga: ({ actions }) =>
        function* () {
            try {
                yield put(actions.success(true))
            } catch (error) {
                yield put(actions.failure(error))
            }
        },
})

