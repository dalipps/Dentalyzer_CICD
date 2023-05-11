import { FrsCalculation } from '../calculation'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'

export class FrsAnalysis {
	id: string
	marks: FrsMark[]
	edges: FrsEdge[]
	calculations: FrsCalculation[]
	image: string
	updatedAt: string
	mmPerPixel?: number

	constructor(
		imageBase64: string,
		marks: FrsMark[],
		edges: FrsEdge[],
		calculations: FrsCalculation[],
		mmPerPixel?: number
	) {
		this.id = crypto.randomUUID()
		this.marks = marks
		this.edges = edges
		this.calculations = calculations
		this.image = imageBase64
		this.updatedAt = new Date().toISOString()
		this.mmPerPixel = mmPerPixel
	}
}
