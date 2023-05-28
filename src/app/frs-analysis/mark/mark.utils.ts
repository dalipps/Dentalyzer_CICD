import { cloneDeep } from 'lodash-es'
import { Vector3 } from 'three'
import { FrsMarkType, FrsPosition } from '.'
import { FrsAnalysis } from '../store/frs.model'

export function setPositionOfMark(analysis: FrsAnalysis, markId: FrsMarkType, position?: FrsPosition): FrsAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	const foundMark = clonedAnalysis.marks.find((m) => m.id === markId)
	if (foundMark) foundMark.position = position

	return clonedAnalysis
}

export function getVectorFromPosition(position?: FrsPosition): Vector3 | undefined {
	if (!position) return
	return new Vector3(position.x, position.y, position.z)
}
