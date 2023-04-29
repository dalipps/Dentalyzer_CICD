import { FrsMark } from './frs-mark.model'

export interface FrsCalibration {
	mark1: FrsMark
	mark2: FrsMark
	// TODO: if display resolution changes, recalculate all mesurements
	mmPerPixel: number
}
