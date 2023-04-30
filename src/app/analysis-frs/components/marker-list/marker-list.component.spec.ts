import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MarkerListComponent } from './marker-list.component'

describe('MarkerListComponent', () => {
	let component: MarkerListComponent
	let fixture: ComponentFixture<MarkerListComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MarkerListComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(MarkerListComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
