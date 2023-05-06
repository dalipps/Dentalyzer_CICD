import { FrsCalculation, FrsEdge, FrsMark } from '@dentalyzer/analysis/frs'
export class FrsAnalysis {
	id: string
	// TODO: move file to indexdb
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
		;(this.image = image),
			(this.marks = marks),
			(this.edges = edges),
			(this.calculations = calculations),
			(this.mmPerPixel = mmPerPixel)
	}
}
