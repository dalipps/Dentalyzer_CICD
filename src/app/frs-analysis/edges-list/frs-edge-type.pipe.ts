import { Pipe, PipeTransform } from '@angular/core'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { FrsEdgeType } from '../edge'

export interface FrsEdgeTranslation {
	abbreviation: string
	name: string
}

@Pipe({
	name: 'frsEdgeTypeTranslation',
	standalone: true,
	pure: true,
})
export class FrsEdgeTypePipe implements PipeTransform {
	transform(type: FrsEdgeType): FrsEdgeTranslation {
		return frsEdgeTypeMapping[type]
	}
}

const frsEdgeTypeMapping: { [key: string]: FrsEdgeTranslation } = {
	[FrsEdgeType.Calibration]: {
		abbreviation: t('FrsEdgeType.Abbreviation.Calibration'),
		name: t('FrsEdgeType.Name.Calibration'),
	},
	[FrsEdgeType.SN]: {
		abbreviation: t('FrsEdgeType.Abbreviation.SN'),
		name: t('FrsEdgeType.Name.SN'),
	},
	[FrsEdgeType.SpaSpp]: {
		abbreviation: t('FrsEdgeType.Abbreviation.SpaSpp'),
		name: t('FrsEdgeType.Name.SpaSpp'),
	},
	[FrsEdgeType.NA]: {
		abbreviation: t('FrsEdgeType.Abbreviation.NA'),
		name: t('FrsEdgeType.Name.NA'),
	},
	[FrsEdgeType.SppA]: {
		abbreviation: t('FrsEdgeType.Abbreviation.SppA'),
		name: t('FrsEdgeType.Name.SppA'),
	},
	[FrsEdgeType.NB]: {
		abbreviation: t('FrsEdgeType.Abbreviation.NB'),
		name: t('FrsEdgeType.Name.NB'),
	},
	[FrsEdgeType.NMe]: {
		abbreviation: t('FrsEdgeType.Abbreviation.NMe'),
		name: t('FrsEdgeType.Name.NMe'),
	},
	[FrsEdgeType.NPog]: {
		abbreviation: t('FrsEdgeType.Abbreviation.NPog'),
		name: t('FrsEdgeType.Name.NPog'),
	},
	[FrsEdgeType.ArGo]: {
		abbreviation: t('FrsEdgeType.Abbreviation.ArGo'),
		name: t('FrsEdgeType.Name.ArGo'),
	},
	[FrsEdgeType.MeGo]: {
		abbreviation: t('FrsEdgeType.Abbreviation.MeGo'),
		name: t('FrsEdgeType.Name.MeGo'),
	},
	[FrsEdgeType.GoaPog2]: {
		abbreviation: t('FrsEdgeType.Abbreviation.GoaPog2'),
		name: t('FrsEdgeType.Name.GoaPog2'),
	},
	[FrsEdgeType.InOK1ApOK1]: {
		abbreviation: t('FrsEdgeType.Abbreviation.InOK1ApOK1'),
		name: t('FrsEdgeType.Name.InOK1ApOK1'),
	},
	[FrsEdgeType.InUK1ApUK1]: {
		abbreviation: t('FrsEdgeType.Abbreviation.InUK1ApUK1'),
		name: t('FrsEdgeType.Name.InUK1ApUK1'),
	},
	[FrsEdgeType.VPOcPHPOcP]: {
		abbreviation: t('FrsEdgeType.Abbreviation.VPOcPHPOcP'),
		name: t('FrsEdgeType.Name.VPOcPHPOcP'),
	},
	[FrsEdgeType.ProNPog2]: {
		abbreviation: t('FrsEdgeType.Abbreviation.ProNPog2'),
		name: t('FrsEdgeType.Name.ProNPog2'),
	},
}
