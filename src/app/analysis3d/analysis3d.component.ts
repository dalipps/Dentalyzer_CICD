import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dent-analysis3d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analysis3d.component.html',
  styleUrls: ['./analysis3d.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Analysis3dComponent {

}
