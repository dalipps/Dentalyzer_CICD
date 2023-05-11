import { Pipe, PipeTransform } from '@angular/core'
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { FrsMarkType } from '../mark/frs-mark-type.enum'

@Pipe({
	name: 'frsMarkTrainingText',
	standalone: true,
	pure: true,
})
export class FrsMarkTrainingTextPipe implements PipeTransform {
	transform(type: FrsMarkType): string {
		return frsMarkTypeMapping[type]
	}
}

const frsMarkTypeMapping: { [key: string]: string } = {}

frsMarkTypeMapping[FrsMarkType.S] = _('FrsMarkType.TrainingText.S')
frsMarkTypeMapping[FrsMarkType.N] = _('FrsMarkType.TrainingText.N')
frsMarkTypeMapping[FrsMarkType.Spa] = _('FrsMarkType.TrainingText.Spa')
frsMarkTypeMapping[FrsMarkType.Spp] = _('FrsMarkType.TrainingText.Spp')
frsMarkTypeMapping[FrsMarkType.Sp] = _('FrsMarkType.TrainingText.Sp')
frsMarkTypeMapping[FrsMarkType.A] = _('FrsMarkType.TrainingText.A')
frsMarkTypeMapping[FrsMarkType.Ar] = _('FrsMarkType.TrainingText.Ar')
frsMarkTypeMapping[FrsMarkType.Me] = _('FrsMarkType.TrainingText.Me')
frsMarkTypeMapping[FrsMarkType.Pog] = _('FrsMarkType.TrainingText.Pog')
frsMarkTypeMapping[FrsMarkType.B] = _('FrsMarkType.TrainingText.B')
frsMarkTypeMapping[FrsMarkType.Tgp] = _('FrsMarkType.TrainingText.Tgp')
frsMarkTypeMapping[FrsMarkType.Tga] = _('FrsMarkType.TrainingText.Tga')
frsMarkTypeMapping[FrsMarkType.Go] = _('FrsMarkType.TrainingText.Go')
frsMarkTypeMapping[FrsMarkType.Goa] = _('FrsMarkType.TrainingText.Goa')
frsMarkTypeMapping[FrsMarkType.InOK1] = _('FrsMarkType.TrainingText.InOK1')
frsMarkTypeMapping[FrsMarkType.ApOK1] = _('FrsMarkType.TrainingText.ApOK1')
frsMarkTypeMapping[FrsMarkType.InUK1] = _('FrsMarkType.TrainingText.InUK1')
frsMarkTypeMapping[FrsMarkType.ApUK1] = _('FrsMarkType.TrainingText.ApUK1')
frsMarkTypeMapping[FrsMarkType.VPOcP] = _('FrsMarkType.TrainingText.VPOcP')
frsMarkTypeMapping[FrsMarkType.HPOcP] = _('FrsMarkType.TrainingText.HPOcP')
frsMarkTypeMapping[FrsMarkType.Ls] = _('FrsMarkType.TrainingText.Ls')
frsMarkTypeMapping[FrsMarkType.Li] = _('FrsMarkType.TrainingText.Li')
frsMarkTypeMapping[FrsMarkType.ProN] = _('FrsMarkType.TrainingText.ProN')
frsMarkTypeMapping[FrsMarkType.Pog2] = _('FrsMarkType.TrainingText.Pog2')
frsMarkTypeMapping[FrsMarkType.Calibration1] = _('FrsMarkType.TrainingText.Calibration1')
frsMarkTypeMapping[FrsMarkType.Calibration2] = _('FrsMarkType.TrainingText.Calibration2')
