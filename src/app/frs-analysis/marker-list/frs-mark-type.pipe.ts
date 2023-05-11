import { Pipe, PipeTransform } from '@angular/core'
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { FrsMarkType } from '../mark/frs-mark-type.enum'

@Pipe({
	name: 'frsMarkTypeTranslation',
	standalone: true,
	pure: true,
})
export class FrsMarkTypePipe implements PipeTransform {
	transform(type: FrsMarkType): string {
		return frsMarkTypeMapping[type]
	}
}

const frsMarkTypeMapping: { [key: string]: string } = {}

frsMarkTypeMapping[FrsMarkType.S] = _('FrsMarkType.S')
frsMarkTypeMapping[FrsMarkType.N] = _('FrsMarkType.N')
frsMarkTypeMapping[FrsMarkType.Spa] = _('FrsMarkType.Spa')
frsMarkTypeMapping[FrsMarkType.Spp] = _('FrsMarkType.Spp')
frsMarkTypeMapping[FrsMarkType.Sp] = _('FrsMarkType.Sp')
frsMarkTypeMapping[FrsMarkType.A] = _('FrsMarkType.A')
frsMarkTypeMapping[FrsMarkType.Ar] = _('FrsMarkType.Ar')
frsMarkTypeMapping[FrsMarkType.Me] = _('FrsMarkType.Me')
frsMarkTypeMapping[FrsMarkType.Pog] = _('FrsMarkType.Pog')
frsMarkTypeMapping[FrsMarkType.B] = _('FrsMarkType.B')
frsMarkTypeMapping[FrsMarkType.Tgp] = _('FrsMarkType.Tgp')
frsMarkTypeMapping[FrsMarkType.Tga] = _('FrsMarkType.Tga')
frsMarkTypeMapping[FrsMarkType.Go] = _('FrsMarkType.Go')
frsMarkTypeMapping[FrsMarkType.Goa] = _('FrsMarkType.Goa')
frsMarkTypeMapping[FrsMarkType.InOK1] = _('FrsMarkType.InOK1')
frsMarkTypeMapping[FrsMarkType.ApOK1] = _('FrsMarkType.ApOK1')
frsMarkTypeMapping[FrsMarkType.InUK1] = _('FrsMarkType.InUK1')
frsMarkTypeMapping[FrsMarkType.ApUK1] = _('FrsMarkType.ApUK1')
frsMarkTypeMapping[FrsMarkType.VPOcP] = _('FrsMarkType.VPOcP')
frsMarkTypeMapping[FrsMarkType.HPOcP] = _('FrsMarkType.HPOcP')
frsMarkTypeMapping[FrsMarkType.Ls] = _('FrsMarkType.Ls')
frsMarkTypeMapping[FrsMarkType.Li] = _('FrsMarkType.Li')
frsMarkTypeMapping[FrsMarkType.ProN] = _('FrsMarkType.ProN')
frsMarkTypeMapping[FrsMarkType.Pog2] = _('FrsMarkType.Pog2')
frsMarkTypeMapping[FrsMarkType.Calibration1] = _('FrsMarkType.Calibration1')
frsMarkTypeMapping[FrsMarkType.Calibration2] = _('FrsMarkType.Calibration2')
