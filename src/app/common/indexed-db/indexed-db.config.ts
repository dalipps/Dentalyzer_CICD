import { DbConfig, DbConfigVersion } from './indexed-db.model'

export const DATABASE_NAME = 'ORIS_DENTALYZER'

export const TABLES = {
	FRS_ANALYSIS: 'FRS_ANALYSIS',
}

export function getDbConfig(): DbConfig {
	return {
		databaseName: DATABASE_NAME,
		versions: [getVersion1_0()],
	}
}

function getVersion1_0(): DbConfigVersion {
	const map: { [key: string]: string } = {}

	map[TABLES.FRS_ANALYSIS] = 'id'

	return {
		databaseVersion: 1.0,
		schema: map,
	}
}
