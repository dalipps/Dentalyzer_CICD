import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisFrsComponent } from './analysis-frs.component'

describe('AnalysisFrsComponent', () => {
	let component: AnalysisFrsComponent
	let fixture: ComponentFixture<AnalysisFrsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AnalysisFrsComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(AnalysisFrsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
