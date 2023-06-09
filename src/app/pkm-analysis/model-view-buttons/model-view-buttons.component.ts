import { CommonModule, NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { PkmRenderingService } from '../rendering/pkm-rendering.service'

@Component({
	selector: 'dent-model-view-buttons',
	standalone: true,
	imports: [CommonModule, TranslateModule, MatButtonModule, MatIconModule, NgClass],
	templateUrl: './model-view-buttons.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelViewButtonsComponent {
	upperJawSelected?: boolean
	lowerJawSelected?: boolean
	@Input() set showAll(state: boolean) {
		this.lowerJawSelected = state
		this.upperJawSelected = state
	}

	constructor(private renderingService: PkmRenderingService) {}

	onLowerJawClick() {
		this.lowerJawSelected = !this.lowerJawSelected
		this.renderingService.showLowerJaw(this.lowerJawSelected)
	}

	onUpperJawClick() {
		this.upperJawSelected = !this.upperJawSelected
		this.renderingService.showUpperJaw(this.upperJawSelected)
	}
}
