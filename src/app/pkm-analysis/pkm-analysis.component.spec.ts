import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PkmAnalysisComponent } from './pkm-analysis.component'

describe('PkmAnalysisComponent', () => {
	let component: PkmAnalysisComponent
	let fixture: ComponentFixture<PkmAnalysisComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PkmAnalysisComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(PkmAnalysisComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
