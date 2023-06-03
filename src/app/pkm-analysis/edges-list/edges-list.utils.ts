import { groupBy } from 'lodash'
import { PkmEdge, PkmEdgeGroupType } from '../edge/pkm-edge'

export function getGroupItem(groupId: PkmEdgeGroupType, isExpanded = false) {
	return { id: groupId, isGroup: true, isExpanded }
}

export function getListItems(edges: PkmEdge[]) {
	const groupedEdges = groupBy(edges, (edge) => edge.groupId)
	const groupIds = Object.keys(PkmEdgeGroupType) as PkmEdgeGroupType[]
	return groupIds.map((groupId) => [
		getGroupItem(groupId),
		...groupedEdges[groupId].map(({ id, distance }) => ({ id, distance })),
	])
}
