import { render, screen } from '@testing-library/angular'
import { HomeComponent } from './home.component'

describe('Home Component', () => {
	beforeEach(async () => {
		await render(HomeComponent)
	})

	it('should render', async () => {
		expect(screen.getByText('Home goes here')).toBeInTheDocument()
	})
})
