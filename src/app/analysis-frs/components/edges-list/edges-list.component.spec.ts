import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EdgesListComponent } from './edges-list.component'

describe('EdgesListComponent', () => {
	let component: EdgesListComponent
	let fixture: ComponentFixture<EdgesListComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EdgesListComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(EdgesListComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
