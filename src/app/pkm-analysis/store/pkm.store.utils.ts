import { initPkmEdges } from '../edge/pkm-edge'
import { PkmAnalysis } from './pkm.model'

export function initPkmAnalysis(modelId: string) {
	const edges = initPkmEdges()
	return new PkmAnalysis(modelId, edges)
}
