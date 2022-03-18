import { createSelector } from 'reselect'

import { MODULE_NAME } from './types'

const rootModuleSelector = (state) => state[MODULE_NAME]

export const exploreStateSelector = createSelector(rootModuleSelector, (state) => state.explore)
