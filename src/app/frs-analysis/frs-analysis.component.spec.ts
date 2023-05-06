import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FrsAnalysisComponent } from './frs-analysis.component'

describe('AnalysisFrsComponent', () => {
	let component: FrsAnalysisComponent
	let fixture: ComponentFixture<FrsAnalysisComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FrsAnalysisComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(FrsAnalysisComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
