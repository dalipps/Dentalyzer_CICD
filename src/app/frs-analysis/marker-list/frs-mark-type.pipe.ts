import { Pipe, PipeTransform } from '@angular/core'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { FrsMarkType } from '../mark/frs-mark-type.enum'

export interface FrsMarkTranslation {
	abbreviation: string
	name: string
	trainingText: string
}

@Pipe({
	name: 'frsMarkTypeTranslation',
	standalone: true,
	pure: true,
})
export class FrsMarkTypePipe implements PipeTransform {
	transform(type: FrsMarkType): FrsMarkTranslation {
		return frsMarkTypeMapping[type]
	}
}

export const frsMarkTypeMapping: { [key: string]: FrsMarkTranslation } = {
	[FrsMarkType.S]: {
		abbreviation: t('FrsMarkType.Abbreviation.S'),
		name: t('FrsMarkType.Name.S'),
		trainingText: t('FrsMarkType.TrainingText.S'),
	},
	[FrsMarkType.N]: {
		abbreviation: t('FrsMarkType.Abbreviation.N'),
		name: t('FrsMarkType.Name.N'),
		trainingText: t('FrsMarkType.TrainingText.N'),
	},
	[FrsMarkType.Spa]: {
		abbreviation: t('FrsMarkType.Abbreviation.Spa'),
		name: t('FrsMarkType.Name.Spa'),
		trainingText: t('FrsMarkType.TrainingText.Spa'),
	},
	[FrsMarkType.Spp]: {
		abbreviation: t('FrsMarkType.Abbreviation.Spp'),
		name: t('FrsMarkType.Name.Spp'),
		trainingText: t('FrsMarkType.TrainingText.Spp'),
	},
	[FrsMarkType.Sp]: {
		abbreviation: t('FrsMarkType.Abbreviation.Sp'),
		name: t('FrsMarkType.Name.Sp'),
		trainingText: t('FrsMarkType.TrainingText.Sp'),
	},
	[FrsMarkType.A]: {
		abbreviation: t('FrsMarkType.Abbreviation.A'),
		name: t('FrsMarkType.Name.A'),
		trainingText: t('FrsMarkType.TrainingText.A'),
	},
	[FrsMarkType.Ar]: {
		abbreviation: t('FrsMarkType.Abbreviation.Ar'),
		name: t('FrsMarkType.Name.Ar'),
		trainingText: t('FrsMarkType.TrainingText.Ar'),
	},
	[FrsMarkType.Me]: {
		abbreviation: t('FrsMarkType.Abbreviation.Me'),
		name: t('FrsMarkType.Name.Me'),
		trainingText: t('FrsMarkType.TrainingText.Me'),
	},
	[FrsMarkType.Pog]: {
		abbreviation: t('FrsMarkType.Abbreviation.Pog'),
		name: t('FrsMarkType.Name.Pog'),
		trainingText: t('FrsMarkType.TrainingText.Pog'),
	},
	[FrsMarkType.B]: {
		abbreviation: t('FrsMarkType.Abbreviation.B'),
		name: t('FrsMarkType.Name.B'),
		trainingText: t('FrsMarkType.TrainingText.B'),
	},
	[FrsMarkType.Tgp]: {
		abbreviation: t('FrsMarkType.Abbreviation.Tgp'),
		name: t('FrsMarkType.Name.Tgp'),
		trainingText: t('FrsMarkType.TrainingText.Tgp'),
	},
	[FrsMarkType.Tga]: {
		abbreviation: t('FrsMarkType.Abbreviation.Tga'),
		name: t('FrsMarkType.Name.Tga'),
		trainingText: t('FrsMarkType.TrainingText.Tga'),
	},
	[FrsMarkType.Go]: {
		abbreviation: t('FrsMarkType.Abbreviation.Go'),
		name: t('FrsMarkType.Name.Go'),
		trainingText: t('FrsMarkType.TrainingText.Go'),
	},
	[FrsMarkType.Goa]: {
		abbreviation: t('FrsMarkType.Abbreviation.Goa'),
		name: t('FrsMarkType.Name.Goa'),
		trainingText: t('FrsMarkType.TrainingText.Goa'),
	},
	[FrsMarkType.InOK1]: {
		abbreviation: t('FrsMarkType.Abbreviation.InOK1'),
		name: t('FrsMarkType.Name.InOK1'),
		trainingText: t('FrsMarkType.TrainingText.InOK1'),
	},
	[FrsMarkType.ApOK1]: {
		abbreviation: t('FrsMarkType.Abbreviation.ApOK1'),
		name: t('FrsMarkType.Name.ApOK1'),
		trainingText: t('FrsMarkType.TrainingText.ApOK1'),
	},
	[FrsMarkType.InUK1]: {
		abbreviation: t('FrsMarkType.Abbreviation.InUK1'),
		name: t('FrsMarkType.Name.InUK1'),
		trainingText: t('FrsMarkType.TrainingText.InUK1'),
	},
	[FrsMarkType.ApUK1]: {
		abbreviation: t('FrsMarkType.Abbreviation.ApUK1'),
		name: t('FrsMarkType.Name.ApUK1'),
		trainingText: t('FrsMarkType.TrainingText.ApUK1'),
	},
	[FrsMarkType.VPOcP]: {
		abbreviation: t('FrsMarkType.Abbreviation.VPOcP'),
		name: t('FrsMarkType.Name.VPOcP'),
		trainingText: t('FrsMarkType.TrainingText.VPOcP'),
	},
	[FrsMarkType.HPOcP]: {
		abbreviation: t('FrsMarkType.Abbreviation.HPOcP'),
		name: t('FrsMarkType.Name.HPOcP'),
		trainingText: t('FrsMarkType.TrainingText.HPOcP'),
	},
	[FrsMarkType.Ls]: {
		abbreviation: t('FrsMarkType.Abbreviation.Ls'),
		name: t('FrsMarkType.Name.Ls'),
		trainingText: t('FrsMarkType.TrainingText.Ls'),
	},
	[FrsMarkType.Li]: {
		abbreviation: t('FrsMarkType.Abbreviation.Li'),
		name: t('FrsMarkType.Name.Li'),
		trainingText: t('FrsMarkType.TrainingText.Li'),
	},
	[FrsMarkType.ProN]: {
		abbreviation: t('FrsMarkType.Abbreviation.ProN'),
		name: t('FrsMarkType.Name.ProN'),
		trainingText: t('FrsMarkType.TrainingText.ProN'),
	},
	[FrsMarkType.Pog2]: {
		abbreviation: t('FrsMarkType.Abbreviation.Pog2'),
		name: t('FrsMarkType.Name.Pog2'),
		trainingText: t('FrsMarkType.TrainingText.Pog2'),
	},
	[FrsMarkType.Calibration1]: {
		abbreviation: t('FrsMarkType.Abbreviation.Calibration1'),
		name: t('FrsMarkType.Name.Calibration1'),
		trainingText: t('FrsMarkType.TrainingText.Calibration1'),
	},
	[FrsMarkType.Calibration2]: {
		abbreviation: t('FrsMarkType.Abbreviation.Calibration2'),
		name: t('FrsMarkType.Name.Calibration2'),
		trainingText: t('FrsMarkType.TrainingText.Calibration2'),
	},
}
