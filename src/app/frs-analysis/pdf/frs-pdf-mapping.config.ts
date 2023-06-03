import { FrsCalculationType } from '../calculation'

interface MappingData {
	valueFieldNames: string[]
	interpretationFieldName: string
	showTargetAsValue?: boolean
}

export const frsPdfMapping = new Map<string, MappingData>([
	[FrsCalculationType.SNA, { valueFieldNames: ['Messung81  3'], interpretationFieldName: 'Interpretation81  3' }],
	[FrsCalculationType.SNB, { valueFieldNames: ['Messung79  3'], interpretationFieldName: 'Interpretation79  3' }],
	[FrsCalculationType.SNPog, { valueFieldNames: ['Messung80  3'], interpretationFieldName: 'Interpretation80  3' }],
	[FrsCalculationType.ANB, { valueFieldNames: ['Messung2  2'], interpretationFieldName: 'Interpretation2  2' }],
	[
		FrsCalculationType.ANBIndiv,
		{
			valueFieldNames: ['MessungANB indiv', '2  2ANB indiv'],
			interpretationFieldName: 'InterpretationANB indiv',
			showTargetAsValue: true,
		},
	],
	[
		FrsCalculationType.Wits,
		{ valueFieldNames: ['Messung1  0mm  2mm'], interpretationFieldName: 'Interpretation1  0mm  2mm' },
	],
	[FrsCalculationType.SNMeGo, { valueFieldNames: ['Messung32  5'], interpretationFieldName: 'Interpretation32  5' }],
	[FrsCalculationType.SNSpP, { valueFieldNames: ['Messung7  3'], interpretationFieldName: 'Interpretation7  3' }],
	[FrsCalculationType.SpPMeGo, { valueFieldNames: ['Messung25  5'], interpretationFieldName: 'Interpretation25  5' }],
	[FrsCalculationType.SGONMe, { valueFieldNames: ['Messung65  4'], interpretationFieldName: 'Interpretation65  4' }],
	[FrsCalculationType.ArGoMe, { valueFieldNames: ['Messung126  6'], interpretationFieldName: 'Interpretation126  6' }],
	[FrsCalculationType.NSpSpMe, { valueFieldNames: ['Messung80  6'], interpretationFieldName: 'Interpretation80  6' }],
	[FrsCalculationType.OK1SN, { valueFieldNames: ['Messung102  5'], interpretationFieldName: 'Interpretation102  5' }],
	[FrsCalculationType.OK1SpP, { valueFieldNames: ['Messung70  5'], interpretationFieldName: 'Interpretation70  5' }],
	[FrsCalculationType.UK1MeGo, { valueFieldNames: ['Messung93  6'], interpretationFieldName: 'Interpretation93  6' }],
	[FrsCalculationType.OK1UK1, { valueFieldNames: ['Messung131  9'], interpretationFieldName: 'Interpretation131  9' }],
	[
		FrsCalculationType.OK1NA,
		{ valueFieldNames: ['Messung4mm  2mm'], interpretationFieldName: 'Interpretation4mm  2mm' },
	],
	[
		FrsCalculationType.UK1NB,
		{ valueFieldNames: ['Messung4mm  2mm_2'], interpretationFieldName: 'Interpretation4mm  2mm_2' },
	],
	[FrsCalculationType.SppASN, { valueFieldNames: ['Messung68  4'], interpretationFieldName: 'Interpretation68  4' }],
	[
		FrsCalculationType.GoaPogSN,
		{ valueFieldNames: ['Messung105  5'], interpretationFieldName: 'Interpretation105  5' },
	],
	[
		FrsCalculationType.SppAGoaPog,
		{ valueFieldNames: ['Messung64  4'], interpretationFieldName: 'Interpretation64  4' },
	],
	[
		FrsCalculationType.LsEsthetic,
		{ valueFieldNames: ['Messung4mm  2mm_3'], interpretationFieldName: 'Interpretation4mm  2mm_3' },
	],
	[
		FrsCalculationType.LiEsthetic,
		{ valueFieldNames: ['Messung2mm  2mm'], interpretationFieldName: 'Interpretation2mm  2mm' },
	],
])
