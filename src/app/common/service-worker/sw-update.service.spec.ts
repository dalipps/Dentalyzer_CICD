import { TestBed } from '@angular/core/testing'

import { SwUpdateService } from './sw-update.service'

describe('SwUpdateService', () => {
	let service: SwUpdateService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(SwUpdateService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
