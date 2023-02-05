import { render, screen } from '@testing-library/angular'
import { HeaderComponent } from './header.component'

describe('Header Component', () => {
	beforeEach(async () => {
		await render(HeaderComponent)
	})

	it('should render', () => {
		expect(screen.getByText('Header goes here')).toBeInTheDocument()
	})
})
