import { PkmEdge } from '../edge/pkm-edge'

export class PkmAnalysis {
	id: string
	edges: PkmEdge[]
	modelId?: string

	constructor(modelId: string, edges: PkmEdge[]) {
		this.id = crypto.randomUUID()
		this.edges = edges
		this.modelId = modelId
	}
}

export function isAnalysis(analysis: PkmAnalysis): analysis is { id: string; modelId: string; edges: PkmEdge[] } {
	return !!analysis?.modelId
}