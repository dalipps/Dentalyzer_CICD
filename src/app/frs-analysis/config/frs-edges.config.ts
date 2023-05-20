import { FrsEdgeConfigDto, FrsEdgeType } from '../edge'
import { FrsMarkType } from '../mark'

export const frsEdgesConfig: FrsEdgeConfigDto[] = [
	{
		id: FrsEdgeType.Calibration,
		markType1: FrsMarkType.Calibration1,
		markType2: FrsMarkType.Calibration2,
	},
	{
		id: FrsEdgeType.SN,
		markType1: FrsMarkType.S,
		markType2: FrsMarkType.N,
	},
	{
		id: FrsEdgeType.SpaSpp,
		markType1: FrsMarkType.Spa,
		markType2: FrsMarkType.Spp,
	},
	{
		id: FrsEdgeType.NA,
		markType1: FrsMarkType.N,
		markType2: FrsMarkType.A,
	},
	{
		id: FrsEdgeType.SppA,
		markType1: FrsMarkType.Spp,
		markType2: FrsMarkType.A,
	},
	{
		id: FrsEdgeType.NB,
		markType1: FrsMarkType.N,
		markType2: FrsMarkType.B,
	},
	{
		id: FrsEdgeType.NMe,
		markType1: FrsMarkType.N,
		markType2: FrsMarkType.Me,
	},
	{
		id: FrsEdgeType.NPog,
		markType1: FrsMarkType.N,
		markType2: FrsMarkType.Pog,
	},
	{
		id: FrsEdgeType.ArGo,
		markType1: FrsMarkType.Ar,
		markType2: FrsMarkType.Go,
	},
	{
		id: FrsEdgeType.MeGo,
		markType1: FrsMarkType.Me,
		markType2: FrsMarkType.Go,
	},
	{
		id: FrsEdgeType.GoaPog2,
		markType1: FrsMarkType.Goa,
		markType2: FrsMarkType.Pog2,
	},
	{
		id: FrsEdgeType.InOK1ApOK1,
		markType1: FrsMarkType.InOK1,
		markType2: FrsMarkType.ApOK1,
	},
	{
		id: FrsEdgeType.InUK1ApUK1,
		markType1: FrsMarkType.InUK1,
		markType2: FrsMarkType.ApUK1,
	},
	{
		id: FrsEdgeType.VPOcPHPOcP,
		markType1: FrsMarkType.VPOcP,
		markType2: FrsMarkType.HPOcP,
	},
	{
		id: FrsEdgeType.ProNPog2,
		markType1: FrsMarkType.ProN,
		markType2: FrsMarkType.Pog2,
	},
]
