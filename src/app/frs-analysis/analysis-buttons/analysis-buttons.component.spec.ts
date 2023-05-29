import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalysisButtonsComponent } from './analysis-buttons.component'

describe('AnalysisButtonsComponent', () => {
	let component: AnalysisButtonsComponent
	let fixture: ComponentFixture<AnalysisButtonsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AnalysisButtonsComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(AnalysisButtonsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
