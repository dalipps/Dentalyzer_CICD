import { TestBed } from '@angular/core/testing'
import { PkmPdfService } from './pkm-pdf.service'

describe('PkmPdfService', () => {
	let service: PkmPdfService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(PkmPdfService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
