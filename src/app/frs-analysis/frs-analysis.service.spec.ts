import { TestBed } from '@angular/core/testing'

import { FrsAnalysisService } from './frs-analysis.service'

describe('FrsAnalysisService', () => {
	let service: FrsAnalysisService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(FrsAnalysisService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
