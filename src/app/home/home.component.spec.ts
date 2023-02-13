import { TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { render, screen } from '@testing-library/angular'
import { HomeComponent } from './home.component'

describe('Home Component', () => {
	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
		})
		await render(HomeComponent)
	})

	it('should render', async () => {
		expect(screen.getByText('Home.Test')).toBeInTheDocument()
	})
})
