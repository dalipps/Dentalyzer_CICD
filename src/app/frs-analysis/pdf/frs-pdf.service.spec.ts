import { TestBed } from '@angular/core/testing'

import { FrsPdfService } from './frs-pdf.service'

describe('FrsPdfService', () => {
	let service: FrsPdfService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(FrsPdfService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
