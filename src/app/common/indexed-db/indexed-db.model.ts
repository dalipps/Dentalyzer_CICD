import { Transaction } from 'dexie'

export interface DbConfig {
	databaseName: string
	versions: DbConfigVersion[]
}

export interface DbConfigVersion {
	databaseVersion?: number
	schema: { [key: string]: string }
	upgrade?: (trans: Transaction) => PromiseLike<unknown> | void
}

export interface DbUpdateEntity {
	[keyPath: string]: unknown
}
