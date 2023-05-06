import { FrsStoreErrorType } from './frs-store-error.enum'

export interface FrsStoreError {
	id?: FrsStoreErrorType
	title?: string
	message?: string
}
