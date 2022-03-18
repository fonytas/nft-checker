import { createReduxModule } from '@makejack4/redux-saga-toolkit'

import * as tasks from './tasks'
import { MODULE_NAME } from './types'

export const gashaponModule = createReduxModule({
    moduleName: MODULE_NAME,
    initialState: {},
    tasks,
})
