import { FrsCalculationType } from '../calculation'

interface MappingData {
	valueFieldName: string
	interpretationFieldName: string
	targetValueFieldName?: string
}

export const frsPdfMapping = new Map<string, MappingData>([
	[FrsCalculationType.SNA, { valueFieldName: 'Messung81  3', interpretationFieldName: 'Interpretation81  3' }],
	[FrsCalculationType.SNB, { valueFieldName: 'Messung79  3', interpretationFieldName: 'Interpretation79  3' }],
	[FrsCalculationType.SNPog, { valueFieldName: 'Messung80  3', interpretationFieldName: 'Interpretation80  3' }],
	[FrsCalculationType.ANB, { valueFieldName: 'Messung2  2', interpretationFieldName: 'Interpretation2  2' }],
	[
		FrsCalculationType.ANBIndiv,
		{
			valueFieldName: 'MessungANB indiv',
			targetValueFieldName: '2  2ANB indiv',
			interpretationFieldName: 'InterpretationANB indiv',
		},
	],
	[
		FrsCalculationType.Wits,
		{ valueFieldName: 'Messung1  0mm  2mm', interpretationFieldName: 'Interpretation1  0mm  2mm' },
	],
	[FrsCalculationType.SNMeGo, { valueFieldName: 'Messung32  5', interpretationFieldName: 'Interpretation32  5' }],
	[FrsCalculationType.SNSpP, { valueFieldName: 'Messung7  3', interpretationFieldName: 'Interpretation7  3' }],
	[FrsCalculationType.SpPMeGo, { valueFieldName: 'Messung25  5', interpretationFieldName: 'Interpretation25  5' }],
	[FrsCalculationType.SGONMe, { valueFieldName: 'Messung65  4', interpretationFieldName: 'Interpretation65  4' }],
	[FrsCalculationType.ArGoMe, { valueFieldName: 'Messung126  6', interpretationFieldName: 'Interpretation126  6' }],
	[FrsCalculationType.NSpSpMe, { valueFieldName: 'Messung80  6', interpretationFieldName: 'Interpretation80  6' }],
	[FrsCalculationType.OK1SN, { valueFieldName: 'Messung102  5', interpretationFieldName: 'Interpretation102  5' }],
	[FrsCalculationType.OK1SpP, { valueFieldName: 'Messung70  5', interpretationFieldName: 'Interpretation70  5' }],
	[FrsCalculationType.UK1MeGo, { valueFieldName: 'Messung93  6', interpretationFieldName: 'Interpretation93  6' }],
	[FrsCalculationType.OK1UK1, { valueFieldName: 'Messung131  9', interpretationFieldName: 'Interpretation131  9' }],
	[FrsCalculationType.OK1NA, { valueFieldName: 'Messung4mm  2mm', interpretationFieldName: 'Interpretation4mm  2mm' }],
	[
		FrsCalculationType.UK1NB,
		{ valueFieldName: 'Messung4mm  2mm_2', interpretationFieldName: 'Interpretation4mm  2mm_2' },
	],
	[FrsCalculationType.SppASN, { valueFieldName: 'Messung68  4', interpretationFieldName: 'Interpretation68  4' }],
	[FrsCalculationType.GoaPogSN, { valueFieldName: 'Messung105  5', interpretationFieldName: 'Interpretation105  5' }],
	[FrsCalculationType.SppAGoaPog, { valueFieldName: 'Messung64  4', interpretationFieldName: 'Interpretation64  4' }],
	[
		FrsCalculationType.LsEsthetic,
		{ valueFieldName: 'Messung4mm  2mm_3', interpretationFieldName: 'Interpretation4mm  2mm_3' },
	],
	[
		FrsCalculationType.LiEsthetic,
		{ valueFieldName: 'Messung2mm  2mm', interpretationFieldName: 'Interpretation2mm  2mm' },
	],
])
