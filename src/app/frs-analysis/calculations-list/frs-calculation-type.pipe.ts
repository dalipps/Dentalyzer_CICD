import { Pipe, PipeTransform } from '@angular/core'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { FrsCalculationType } from '../calculation'

export interface FrsInterpretation {
	equals: string
	greater: string
	smaller: string
}

export interface FrsCalculationTranslation {
	abbreviation: string
	description: string
	interpretation: FrsInterpretation
}

@Pipe({
	name: 'frsCalculationTypeTranslation',
	standalone: true,
	pure: true,
})
export class FrsCalculationTypePipe implements PipeTransform {
	transform(type: FrsCalculationType): FrsCalculationTranslation {
		return frsCalculationTypeMapping[type]
	}
}

export const frsCalculationTypeMapping: { [key: string]: FrsCalculationTranslation } = {
	[FrsCalculationType.SNA]: {
		abbreviation: t('FrsCalculationType.SNA.Abbreviation'),
		description: t('FrsCalculationType.SNA.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SNA.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SNA.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SNA.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SNB]: {
		abbreviation: t('FrsCalculationType.SNB.Abbreviation'),
		description: t('FrsCalculationType.SNB.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SNB.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SNB.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SNB.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SNPog]: {
		abbreviation: t('FrsCalculationType.SNPog.Abbreviation'),
		description: t('FrsCalculationType.SNPog.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SNPog.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SNPog.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SNPog.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.ANB]: {
		abbreviation: t('FrsCalculationType.ANB.Abbreviation'),
		description: t('FrsCalculationType.ANB.Description'),
		interpretation: {
			greater: t('FrsCalculationType.ANB.Interpretation.Greater'),
			smaller: t('FrsCalculationType.ANB.Interpretation.Smaller'),
			equals: t('FrsCalculationType.ANB.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.ANBIndiv]: {
		abbreviation: t('FrsCalculationType.ANBIndiv.Abbreviation'),
		description: t('FrsCalculationType.ANBIndiv.Description'),
		interpretation: {
			greater: t('FrsCalculationType.ANBIndiv.Interpretation.Greater'),
			smaller: t('FrsCalculationType.ANBIndiv.Interpretation.Smaller'),
			equals: t('FrsCalculationType.ANBIndiv.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.Wits]: {
		abbreviation: t('FrsCalculationType.Wits.Abbreviation'),
		description: t('FrsCalculationType.Wits.Description'),
		interpretation: {
			greater: t('FrsCalculationType.Wits.Interpretation.Greater'),
			smaller: t('FrsCalculationType.Wits.Interpretation.Smaller'),
			equals: t('FrsCalculationType.Wits.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SNMeGo]: {
		abbreviation: t('FrsCalculationType.SNMeGo.Abbreviation'),
		description: t('FrsCalculationType.SNMeGo.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SNMeGo.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SNMeGo.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SNMeGo.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SNSpP]: {
		abbreviation: t('FrsCalculationType.SNSpP.Abbreviation'),
		description: t('FrsCalculationType.SNSpP.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SNSpP.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SNSpP.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SNSpP.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SpPMeGo]: {
		abbreviation: t('FrsCalculationType.SpPMeGo.Abbreviation'),
		description: t('FrsCalculationType.SpPMeGo.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SpPMeGo.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SpPMeGo.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SpPMeGo.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SGONMe]: {
		abbreviation: t('FrsCalculationType.SGONMe.Abbreviation'),
		description: t('FrsCalculationType.SGONMe.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SGONMe.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SGONMe.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SGONMe.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.ArGoMe]: {
		abbreviation: t('FrsCalculationType.ArGoMe.Abbreviation'),
		description: t('FrsCalculationType.ArGoMe.Description'),
		interpretation: {
			greater: t('FrsCalculationType.ArGoMe.Interpretation.Greater'),
			smaller: t('FrsCalculationType.ArGoMe.Interpretation.Smaller'),
			equals: t('FrsCalculationType.ArGoMe.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.NSpSpMe]: {
		abbreviation: t('FrsCalculationType.NSpSpMe.Abbreviation'),
		description: t('FrsCalculationType.NSpSpMe.Description'),
		interpretation: {
			greater: t('FrsCalculationType.NSpSpMe.Interpretation.Greater'),
			smaller: t('FrsCalculationType.NSpSpMe.Interpretation.Smaller'),
			equals: t('FrsCalculationType.NSpSpMe.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.OK1SN]: {
		abbreviation: t('FrsCalculationType.OK1SN.Abbreviation'),
		description: t('FrsCalculationType.OK1SN.Description'),
		interpretation: {
			greater: t('FrsCalculationType.OK1SN.Interpretation.Greater'),
			smaller: t('FrsCalculationType.OK1SN.Interpretation.Smaller'),
			equals: t('FrsCalculationType.OK1SN.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.OK1SpP]: {
		abbreviation: t('FrsCalculationType.OK1SpP.Abbreviation'),
		description: t('FrsCalculationType.OK1SpP.Description'),
		interpretation: {
			greater: t('FrsCalculationType.OK1SpP.Interpretation.Greater'),
			smaller: t('FrsCalculationType.OK1SpP.Interpretation.Smaller'),
			equals: t('FrsCalculationType.OK1SpP.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.UK1MeGo]: {
		abbreviation: t('FrsCalculationType.UK1MeGo.Abbreviation'),
		description: t('FrsCalculationType.UK1MeGo.Description'),
		interpretation: {
			greater: t('FrsCalculationType.UK1MeGo.Interpretation.Greater'),
			smaller: t('FrsCalculationType.UK1MeGo.Interpretation.Smaller'),
			equals: t('FrsCalculationType.UK1MeGo.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.OK1UK1]: {
		abbreviation: t('FrsCalculationType.OK1UK1.Abbreviation'),
		description: t('FrsCalculationType.OK1UK1.Description'),
		interpretation: {
			greater: t('FrsCalculationType.OK1UK1.Interpretation.Greater'),
			smaller: t('FrsCalculationType.OK1UK1.Interpretation.Smaller'),
			equals: t('FrsCalculationType.OK1UK1.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.OK1NA]: {
		abbreviation: t('FrsCalculationType.OK1NA.Abbreviation'),
		description: t('FrsCalculationType.OK1NA.Description'),
		interpretation: {
			greater: t('FrsCalculationType.OK1NA.Interpretation.Greater'),
			smaller: t('FrsCalculationType.OK1NA.Interpretation.Smaller'),
			equals: t('FrsCalculationType.OK1NA.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.UK1NB]: {
		abbreviation: t('FrsCalculationType.UK1NB.Abbreviation'),
		description: t('FrsCalculationType.UK1NB.Description'),
		interpretation: {
			greater: t('FrsCalculationType.UK1NB.Interpretation.Greater'),
			smaller: t('FrsCalculationType.UK1NB.Interpretation.Smaller'),
			equals: t('FrsCalculationType.UK1NB.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SppASN]: {
		abbreviation: t('FrsCalculationType.SppASN.Abbreviation'),
		description: t('FrsCalculationType.SppASN.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SppASN.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SppASN.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SppASN.Interpretation.Equals'),
		},
	},

	[FrsCalculationType.GoaPogSN]: {
		abbreviation: t('FrsCalculationType.GoaPogSN.Abbreviation'),
		description: t('FrsCalculationType.GoaPogSN.Description'),
		interpretation: {
			greater: t('FrsCalculationType.GoaPogSN.Interpretation.Greater'),
			smaller: t('FrsCalculationType.GoaPogSN.Interpretation.Smaller'),
			equals: t('FrsCalculationType.GoaPogSN.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.SppAGoaPog]: {
		abbreviation: t('FrsCalculationType.SppAGoaPog.Abbreviation'),
		description: t('FrsCalculationType.SppAGoaPog.Description'),
		interpretation: {
			greater: t('FrsCalculationType.SppAGoaPog.Interpretation.Greater'),
			smaller: t('FrsCalculationType.SppAGoaPog.Interpretation.Smaller'),
			equals: t('FrsCalculationType.SppAGoaPog.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.LsEsthetic]: {
		abbreviation: t('FrsCalculationType.LsEsthetic.Abbreviation'),
		description: t('FrsCalculationType.LsEsthetic.Description'),
		interpretation: {
			greater: t('FrsCalculationType.LsEsthetic.Interpretation.Greater'),
			smaller: t('FrsCalculationType.LsEsthetic.Interpretation.Smaller'),
			equals: t('FrsCalculationType.LsEsthetic.Interpretation.Equals'),
		},
	},
	[FrsCalculationType.LiEsthetic]: {
		abbreviation: t('FrsCalculationType.LiEsthetic.Abbreviation'),
		description: t('FrsCalculationType.LiEsthetic.Description'),
		interpretation: {
			greater: t('FrsCalculationType.LiEsthetic.Interpretation.Greater'),
			smaller: t('FrsCalculationType.LiEsthetic.Interpretation.Smaller'),
			equals: t('FrsCalculationType.LiEsthetic.Interpretation.Equals'),
		},
	},
}
