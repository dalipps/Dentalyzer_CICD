import { render, screen } from '@testing-library/angular'
import { PageComponent } from './page.component'

describe('Page Component', () => {
	beforeEach(async () => {
		await render(PageComponent)
	})

	it('should display header', () => {
		expect(screen.getByTestId('page-header')).toBeInTheDocument()
	})
})
