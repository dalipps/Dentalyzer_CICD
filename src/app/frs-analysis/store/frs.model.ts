import { FrsCalculation } from '../calculation'
import { FrsEdge } from '../edge'
import { FrsMark } from '../mark'

export class FrsAnalysis {
	id: string
	image: File
	marks: FrsMark[]
	edges: FrsEdge[]
	calculations: FrsCalculation[]
	mmPerPixel?: number

	constructor(
		id: string,
		image: File,
		marks: FrsMark[],
		edges: FrsEdge[],
		calculations: FrsCalculation[],
		mmPerPixel?: number
	) {
		this.id = id
		this.image = image
		this.marks = marks
		this.edges = edges
		this.calculations = calculations
		this.mmPerPixel = mmPerPixel
	}
}
