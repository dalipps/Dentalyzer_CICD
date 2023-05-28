import {
	FrsBisectorGeneration,
	FrsEdgeIntersectionGeneration,
	FrsGenerationDataType,
	FrsHalfCuttingGeneration,
} from '../auto-generation'
import { FrsCalculationType } from '../calculation'
import { FrsEdgeType } from '../edge'
import { FrsMarkConfigDto, FrsMarkType } from '../mark'

export const frsMarksConfig: FrsMarkConfigDto[] = [
	{
		id: FrsMarkType.Calibration1,
		edgeTypes: [FrsEdgeType.Calibration],
		calculationTypes: [],
	},
	{
		id: FrsMarkType.Calibration2,
		edgeTypes: [FrsEdgeType.Calibration],
		calculationTypes: [],
	},
	{
		id: FrsMarkType.S,
		edgeTypes: [FrsEdgeType.SN],
		calculationTypes: [
			FrsCalculationType.SGONMe,
			FrsCalculationType.SppASN,
			FrsCalculationType.GoaPogSN,
			FrsCalculationType.SNA,
			FrsCalculationType.SNB,
			FrsCalculationType.SNPog,
			FrsCalculationType.SNSpP,
			FrsCalculationType.OK1SN,
		],
	},
	{
		id: FrsMarkType.N,
		edgeTypes: [FrsEdgeType.SN, FrsEdgeType.NA, FrsEdgeType.NB, FrsEdgeType.NMe, FrsEdgeType.NPog],
		calculationTypes: [
			FrsCalculationType.SGONMe,
			FrsCalculationType.NSpSpMe,
			FrsCalculationType.SppASN,
			FrsCalculationType.GoaPogSN,
			FrsCalculationType.SNA,
			FrsCalculationType.SNB,
			FrsCalculationType.SNPog,
			FrsCalculationType.SNSpP,
			FrsCalculationType.OK1SN,
			FrsCalculationType.ANB,
			FrsCalculationType.OK1NA,
			FrsCalculationType.UK1NB,
		],
	},
	{
		id: FrsMarkType.Spa,
		edgeTypes: [FrsEdgeType.SpaSpp],
		calculationTypes: [FrsCalculationType.SNSpP, FrsCalculationType.SpPMeGo, FrsCalculationType.OK1SpP],
	},
	{
		id: FrsMarkType.Spp,
		edgeTypes: [FrsEdgeType.SpaSpp, FrsEdgeType.SppA],
		calculationTypes: [
			FrsCalculationType.SppASN,
			FrsCalculationType.SppAGoaPog,
			FrsCalculationType.SNSpP,
			FrsCalculationType.SpPMeGo,
			FrsCalculationType.OK1SpP,
		],
	},
	{
		id: FrsMarkType.Sp,
		edgeTypes: [],
		generationData: <FrsEdgeIntersectionGeneration>{
			id: FrsGenerationDataType.EdgeIntersection,
			edge1: FrsEdgeType.SpaSpp,
			edge2: FrsEdgeType.NMe,
		},
		calculationTypes: [FrsCalculationType.NSpSpMe],
	},
	{
		id: FrsMarkType.A,
		edgeTypes: [FrsEdgeType.SppA, FrsEdgeType.NA],
		calculationTypes: [
			FrsCalculationType.Wits,
			FrsCalculationType.SppASN,
			FrsCalculationType.SppAGoaPog,
			FrsCalculationType.SNA,
			FrsCalculationType.ANB,
			FrsCalculationType.OK1NA,
		],
	},
	{
		id: FrsMarkType.Ar,
		edgeTypes: [FrsEdgeType.ArGo],
		calculationTypes: [FrsCalculationType.ArGoMe],
	},
	{
		id: FrsMarkType.Me,
		edgeTypes: [FrsEdgeType.NMe, FrsEdgeType.MeGo],
		calculationTypes: [
			FrsCalculationType.SGONMe,
			FrsCalculationType.NSpSpMe,
			FrsCalculationType.SpPMeGo,
			FrsCalculationType.ArGoMe,
			FrsCalculationType.UK1MeGo,
		],
	},
	{
		id: FrsMarkType.Pog,
		edgeTypes: [FrsEdgeType.NPog],
		calculationTypes: [FrsCalculationType.GoaPogSN, FrsCalculationType.SppAGoaPog, FrsCalculationType.SNPog],
	},
	{
		id: FrsMarkType.B,
		edgeTypes: [FrsEdgeType.NB],
		calculationTypes: [
			FrsCalculationType.Wits,
			FrsCalculationType.SNB,
			FrsCalculationType.ANB,
			FrsCalculationType.UK1NB,
		],
	},
	{
		id: FrsMarkType.Tgp,
		edgeTypes: [],
		calculationTypes: [],
	},
	{
		id: FrsMarkType.Tga,
		edgeTypes: [],
		calculationTypes: [],
	},
	{
		id: FrsMarkType.Go,
		edgeTypes: [FrsEdgeType.ArGo, FrsEdgeType.MeGo],
		generationData: <FrsBisectorGeneration>{
			id: FrsGenerationDataType.Bisector,
			line1point1: FrsMarkType.Ar,
			line1point2: FrsMarkType.Tgp,
			line2point1: FrsMarkType.Me,
			line2point2: FrsMarkType.Tga,
		},
		calculationTypes: [
			FrsCalculationType.SGONMe,
			FrsCalculationType.ArGoMe,
			FrsCalculationType.SpPMeGo,
			FrsCalculationType.UK1MeGo,
		],
	},
	{
		id: FrsMarkType.Goa,
		edgeTypes: [FrsEdgeType.GoaPog2],
		calculationTypes: [FrsCalculationType.GoaPogSN, FrsCalculationType.SppAGoaPog],
	},
	{
		id: FrsMarkType.InOK1,
		edgeTypes: [FrsEdgeType.InOK1ApOK1],
		calculationTypes: [
			FrsCalculationType.OK1NA,
			FrsCalculationType.OK1SN,
			FrsCalculationType.OK1SpP,
			FrsCalculationType.OK1UK1,
		],
	},
	{
		id: FrsMarkType.ApOK1,
		edgeTypes: [FrsEdgeType.InOK1ApOK1],
		calculationTypes: [FrsCalculationType.OK1SN, FrsCalculationType.OK1SpP, FrsCalculationType.OK1UK1],
	},
	{
		id: FrsMarkType.InUK1,
		edgeTypes: [FrsEdgeType.InUK1ApUK1],
		calculationTypes: [FrsCalculationType.UK1NB, FrsCalculationType.UK1MeGo, FrsCalculationType.OK1UK1],
	},
	{
		id: FrsMarkType.ApUK1,
		edgeTypes: [FrsEdgeType.InUK1ApUK1],
		calculationTypes: [FrsCalculationType.UK1MeGo, FrsCalculationType.OK1UK1],
	},
	{
		id: FrsMarkType.VPOcP,
		edgeTypes: [FrsEdgeType.VPOcPHPOcP],
		generationData: <FrsHalfCuttingGeneration>{
			id: FrsGenerationDataType.HalfCutting,
			point1: FrsMarkType.InOK1,
			point2: FrsMarkType.InUK1,
		},
		calculationTypes: [FrsCalculationType.Wits],
	},
	{
		id: FrsMarkType.HPOcP,
		edgeTypes: [FrsEdgeType.VPOcPHPOcP],
		calculationTypes: [FrsCalculationType.Wits],
	},
	{
		id: FrsMarkType.Ls,
		edgeTypes: [],
		calculationTypes: [FrsCalculationType.LsEsthetic],
	},
	{
		id: FrsMarkType.Li,
		edgeTypes: [],
		calculationTypes: [FrsCalculationType.LiEsthetic],
	},
	{
		id: FrsMarkType.ProN,
		edgeTypes: [FrsEdgeType.ProNPog2],
		calculationTypes: [FrsCalculationType.LsEsthetic, FrsCalculationType.LiEsthetic],
	},
	{
		id: FrsMarkType.Pog2,
		edgeTypes: [FrsEdgeType.ProNPog2, FrsEdgeType.GoaPog2],
		calculationTypes: [FrsCalculationType.LsEsthetic, FrsCalculationType.LiEsthetic],
	},
]
