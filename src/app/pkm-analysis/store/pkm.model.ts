export class PkmAnalysis {
	id: string
	modelId?: string

	constructor(modelId: string) {
		this.id = crypto.randomUUID()
		this.modelId = modelId
	}
}
