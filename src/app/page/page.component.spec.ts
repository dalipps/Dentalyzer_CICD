import { TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { render, screen } from '@testing-library/angular'
import { PageComponent } from './page.component'

describe('Page Component', () => {
	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
		})
		await render(PageComponent)
	})

	it('should display header', () => {
		expect(screen.getByTestId('page-header')).toBeInTheDocument()
	})
})
