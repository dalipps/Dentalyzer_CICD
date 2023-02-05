import { render, screen } from '@testing-library/angular'
import { AppComponent } from './app.component'

describe('App Component', () => {
	beforeEach(async () => {
		await render(AppComponent)
	})

	it('should render', () => {
		expect(screen.getByTestId('app-router-outlet')).toBeInTheDocument()
	})
})
