import { Injectable } from '@angular/core'
import Dexie, { IndexableType, IndexableTypePart } from 'dexie'
import { Observable, from } from 'rxjs'
import { getDbConfig } from './indexed-db.config'

@Injectable({
	providedIn: 'root',
})
export class IndexedDbService extends Dexie {
	constructor() {
		const config = getDbConfig()
		super(config.databaseName)

		for (const configVersion of config.versions) {
			const version = this.version(configVersion.databaseVersion || 1).stores(configVersion.schema)

			if (configVersion.upgrade) {
				version.upgrade(configVersion.upgrade)
			}
		}
	}

	count(table: string): Observable<number> {
		return from(this.table(table).count())
	}

	addOrUpdateOne<TEntity>(table: string, object: TEntity, key?: IndexableType): Observable<IndexableType> {
		if (key) {
			return from(this.table(table).put(object, key))
		} else {
			return from(this.table(table).put(object))
		}
	}

	addOrUpdateMultiple<TEntity>(
		table: string,
		objects: TEntity[],
		keys?: IndexableTypePart[]
	): Observable<IndexableType> {
		if (keys) {
			return from(this.table(table).bulkPut(objects, keys))
		} else {
			return from(this.table(table).bulkPut(objects))
		}
	}

	deleteOne(table: string, primaryKey: IndexableType): Observable<void> {
		return from(this.table(table).delete(primaryKey))
	}

	deleteMultiple(table: string, primaryKeys: IndexableType[]): Observable<void> {
		return from(this.table(table).bulkDelete(primaryKeys))
	}

	clearAll(table: string): Observable<void> {
		return from(this.table(table).clear())
	}

	filter<TEntity>(table: string, filterFunction: (value: TEntity) => boolean): Observable<TEntity[]> {
		return from(this.table(table).filter(filterFunction).toArray())
	}

	getOne<TEntity>(table: string, primaryKey: IndexableType): Observable<TEntity> {
		return from(this.table(table).get(primaryKey))
	}

	getFirst<TEntity>(table: string): Observable<TEntity> {
		return from(this.table(table).limit(1).first())
	}

	getAll<TEntity>(table: string): Observable<TEntity[]> {
		return from(this.table(table).toArray())
	}

	recreateDatabase() {
		return from(this.delete().then(() => this.open()))
	}
}
