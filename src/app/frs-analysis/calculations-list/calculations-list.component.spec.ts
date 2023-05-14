import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CalculationsListComponent } from './calculations-list.component'

describe('CalculationsListComponent', () => {
	let component: CalculationsListComponent
	let fixture: ComponentFixture<CalculationsListComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalculationsListComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(CalculationsListComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
