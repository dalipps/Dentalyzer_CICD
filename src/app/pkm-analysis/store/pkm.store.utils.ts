import { SerializableVector3 } from '@dentalyzer/common'
import { cloneDeep } from 'lodash-es'
import { Vector3 } from 'three'
import { PkmEdgeType } from '../edge/pkm-edge'
import { initPkmEdges } from '../edge/pkm-edges'
import { PkmAnalysis } from './pkm.model'

export function initPkmAnalysis(modelId: string) {
	const edges = initPkmEdges()
	return new PkmAnalysis(modelId, edges)
}

export function setMark(
	analysis: PkmAnalysis,
	edgeId: PkmEdgeType,
	position?: SerializableVector3,
	isUpper?: boolean
): PkmAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	const foundEdge = clonedAnalysis.edges.find((e) => e.id === edgeId)
	if (!foundEdge) {
		return clonedAnalysis
	}

	if (!foundEdge.mark1) foundEdge.mark1 = position
	else if (!foundEdge.mark2) foundEdge.mark2 = position

	if (foundEdge.mark1 && foundEdge.mark2) {
		const distance = calculateDistance(foundEdge.mark1, foundEdge.mark2)
		foundEdge.distance = Math.round(distance * 100) / 100
	}

	foundEdge.isUpper = isUpper

	return clonedAnalysis
}

export function removeEdge(analysis: PkmAnalysis, edgeId: PkmEdgeType): PkmAnalysis {
	const clonedAnalysis = cloneDeep(analysis)

	const foundEdge = clonedAnalysis.edges.find((e) => e.id === edgeId)
	if (!foundEdge) {
		return clonedAnalysis
	}

	delete foundEdge.mark1
	delete foundEdge.mark2
	delete foundEdge.distance
	delete foundEdge.isUpper

	return clonedAnalysis
}

function calculateDistance(mark1: SerializableVector3, mark2: SerializableVector3): number {
	const v1 = new Vector3(mark1.x, mark1.y, mark1.z)
	const v2 = new Vector3(mark2.x, mark2.y, mark2.z)
	return v1.distanceTo(v2)
}
