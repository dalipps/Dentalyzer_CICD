import { cloneDeep } from 'lodash-es'
import { FrsMarkType, FrsPosition } from '../mark'
import { FrsAnalysis } from './frs.model'

export function setPositionOfMark(analysis: FrsAnalysis, markId: FrsMarkType, position?: FrsPosition): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	const foundMark = clonedAnalysis.marks.find((m) => m.id === markId)
	if (foundMark) foundMark.position = position

	return clonedAnalysis
}
