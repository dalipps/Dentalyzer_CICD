import { TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { render, screen } from '@testing-library/angular'
import { HeaderComponent } from './header.component'

describe('Header Component', () => {
	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
		})
		await render(HeaderComponent)
	})

	it('should display title', () => {
		expect(screen.getByText('Dentalyzer')).toBeInTheDocument()
	})

	it('should display logo', () => {
		expect(screen.getAllByAltText('Dentalyzer Logo'))
	})
})
