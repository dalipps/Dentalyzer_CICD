import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Analysis3dComponent } from './analysis3d.component'

describe('Analysis3dComponent', () => {
	let component: Analysis3dComponent
	let fixture: ComponentFixture<Analysis3dComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Analysis3dComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(Analysis3dComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
