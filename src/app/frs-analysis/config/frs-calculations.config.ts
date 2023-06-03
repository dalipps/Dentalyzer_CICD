import {
	FrsAngleCalculation,
	FrsAngleMultiplicationCalculation,
	FrsAngleSumCalculation,
	FrsCalculationConfigDto,
	FrsCalculationDataType,
	FrsCalculationType,
	FrsCalculationUnit,
	FrsDistanceCalculation,
	FrsIntersectionDistanceCalculation,
	FrsQuotientCalculation,
} from '../calculation'
import { FrsEdgeType } from '../edge'
import { FrsMarkType } from '../mark'

export const frsCalculationsConfig: FrsCalculationConfigDto[] = [
	{
		id: FrsCalculationType.SNA,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.SN,
			edge2: FrsEdgeType.NA,
			isLeft: false,
		},
		targetValueMaleOrAll: 81,
		deviation: 3,
	},
	{
		id: FrsCalculationType.SNB,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.SN,
			edge2: FrsEdgeType.NB,
			isLeft: false,
		},
		targetValueMaleOrAll: 79,
		deviation: 3,
	},
	{
		id: FrsCalculationType.SNPog,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.SN,
			edge2: FrsEdgeType.NPog,
			isLeft: false,
		},
		targetValueMaleOrAll: 80,
		deviation: 3,
	},
	{
		id: FrsCalculationType.ANB,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.NA,
			edge2: FrsEdgeType.NB,
			isLeft: true,
		},
		targetValueMaleOrAll: 2,
		deviation: 2,
	},
	{
		id: FrsCalculationType.ANBIndiv,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleMultiplicationCalculation>{
			id: FrsCalculationDataType.AngleMultiplication,
			targetStartValue: -35.16,
			targetFactor1: 0.4,
			targetAngle1: FrsCalculationType.SNA,
			targetFactor2: 0.2,
			targetAngle2: FrsCalculationType.SNMeGo,
		},
		targetValueMaleOrAll: undefined,
		deviation: 1,
	},
	{
		id: FrsCalculationType.Wits,
		unit: FrsCalculationUnit.Millimeter,
		data: <FrsIntersectionDistanceCalculation>{
			id: FrsCalculationDataType.IntersectionDistance,
			edge: FrsEdgeType.VPOcPHPOcP,
			point1: FrsMarkType.A,
			point2: FrsMarkType.B,
		},

		targetValueMaleOrAll: -1,
		targetValueFemale: 0,
		deviation: 2,
	},
	{
		id: FrsCalculationType.SNMeGo,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleSumCalculation>{
			id: FrsCalculationDataType.AngleSum,
			angle1: FrsCalculationType.SNSpP,
			angle2: FrsCalculationType.SpPMeGo,
		},
		targetValueMaleOrAll: 32,
		deviation: 5,
	},
	{
		id: FrsCalculationType.SNSpP,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.SN,
			edge2: FrsEdgeType.SpaSpp,
			isLeft: false,
		},
		targetValueMaleOrAll: 7,
		deviation: 3,
	},
	{
		id: FrsCalculationType.SpPMeGo,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.SpaSpp,
			edge2: FrsEdgeType.MeGo,
			isLeft: true,
		},
		targetValueMaleOrAll: 25,
		deviation: 5,
	},
	{
		id: FrsCalculationType.SGONMe,
		unit: FrsCalculationUnit.Percent,
		data: <FrsQuotientCalculation>{
			id: FrsCalculationDataType.Quotient,
			line1point1: FrsMarkType.S,
			line1point2: FrsMarkType.Go,
			line2point1: FrsMarkType.N,
			line2point2: FrsMarkType.Me,
		},
		targetValueMaleOrAll: 65,
		deviation: 4,
	},
	{
		id: FrsCalculationType.ArGoMe,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.ArGo,
			edge2: FrsEdgeType.MeGo,
			isLeft: true,
		},
		targetValueMaleOrAll: 126,
		deviation: 6,
	},
	{
		id: FrsCalculationType.NSpSpMe,
		unit: FrsCalculationUnit.Percent,
		data: <FrsQuotientCalculation>{
			id: FrsCalculationDataType.Quotient,
			line1point1: FrsMarkType.N,
			line1point2: FrsMarkType.Sp,
			line2point1: FrsMarkType.Sp,
			line2point2: FrsMarkType.Me,
		},
		targetValueMaleOrAll: 80,
		deviation: 6,
	},
	{
		id: FrsCalculationType.OK1SN,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.InOK1ApOK1,
			edge2: FrsEdgeType.SN,
			isLeft: true,
		},
		targetValueMaleOrAll: 102,
		deviation: 5,
	},
	{
		id: FrsCalculationType.OK1SpP,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.InOK1ApOK1,
			edge2: FrsEdgeType.SpaSpp,
			isLeft: true,
		},
		targetValueMaleOrAll: 70,
		deviation: 5,
	},
	{
		id: FrsCalculationType.UK1MeGo,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.InUK1ApUK1,
			edge2: FrsEdgeType.MeGo,
			isLeft: false,
		},
		targetValueMaleOrAll: 93,
		deviation: 6,
	},
	{
		id: FrsCalculationType.OK1UK1,
		unit: FrsCalculationUnit.Degree,
		data: <FrsAngleCalculation>{
			id: FrsCalculationDataType.Angle,
			edge1: FrsEdgeType.InOK1ApOK1,
			edge2: FrsEdgeType.InUK1ApUK1,
			isLeft: true,
		},
		targetValueMaleOrAll: 131,
		deviation: 9,
	},
	{
		id: FrsCalculationType.OK1NA,
		unit: FrsCalculationUnit.Millimeter,
		data: <FrsDistanceCalculation>{
			id: FrsCalculationDataType.Distance,
			edge: FrsEdgeType.NA,
			point: FrsMarkType.InOK1,
		},
		targetValueMaleOrAll: 4,
		deviation: 2,
	},
	{
		id: FrsCalculationType.UK1NB,
		unit: FrsCalculationUnit.Millimeter,
		data: <FrsDistanceCalculation>{
			id: FrsCalculationDataType.Distance,
			edge: FrsEdgeType.NB,
			point: FrsMarkType.InUK1,
		},
		targetValueMaleOrAll: 4,
		deviation: 2,
	},
	{
		id: FrsCalculationType.SppASN,
		unit: FrsCalculationUnit.Percent,
		data: <FrsQuotientCalculation>{
			id: FrsCalculationDataType.Quotient,
			line1point1: FrsMarkType.Spp,
			line1point2: FrsMarkType.A,
			line2point1: FrsMarkType.S,
			line2point2: FrsMarkType.N,
		},
		targetValueMaleOrAll: 68,
		deviation: 4,
	},
	{
		id: FrsCalculationType.GoaPogSN,
		unit: FrsCalculationUnit.Percent,
		data: <FrsQuotientCalculation>{
			id: FrsCalculationDataType.Quotient,
			line1point1: FrsMarkType.Goa,
			line1point2: FrsMarkType.Pog,
			line2point1: FrsMarkType.S,
			line2point2: FrsMarkType.N,
		},
		targetValueMaleOrAll: 105,
		deviation: 5,
	},
	{
		id: FrsCalculationType.SppAGoaPog,
		unit: FrsCalculationUnit.Percent,
		data: <FrsQuotientCalculation>{
			id: FrsCalculationDataType.Quotient,
			line1point1: FrsMarkType.Spp,
			line1point2: FrsMarkType.A,
			line2point1: FrsMarkType.Goa,
			line2point2: FrsMarkType.Pog,
		},
		targetValueMaleOrAll: 64,
		deviation: 4,
	},
	{
		id: FrsCalculationType.LsEsthetic,
		unit: FrsCalculationUnit.Millimeter,
		data: <FrsDistanceCalculation>{
			id: FrsCalculationDataType.Distance,
			edge: FrsEdgeType.ProNPog2,
			point: FrsMarkType.Ls,
			considerSign: true,
		},
		targetValueMaleOrAll: -4,
		deviation: 2,
	},
	{
		id: FrsCalculationType.LiEsthetic,
		unit: FrsCalculationUnit.Millimeter,
		data: <FrsDistanceCalculation>{
			id: FrsCalculationDataType.Distance,
			edge: FrsEdgeType.ProNPog2,
			point: FrsMarkType.Li,
			considerSign: true,
		},
		targetValueMaleOrAll: -2,
		deviation: 2,
	},
]
