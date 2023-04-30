import { FrsEdgeType, FrsMark, FrsMarkType } from '@dentalyzer/analysis/frs'

export const frsMarkConfig: FrsMark[] = [
	{
		id: FrsMarkType.Calibration1,
		edgeTypes: [FrsEdgeType.Calibration],
	},
	{
		id: FrsMarkType.Calibration2,
		edgeTypes: [FrsEdgeType.Calibration],
	},
	{
		id: FrsMarkType.S,
		edgeTypes: [FrsEdgeType.SN],
	},
	{
		id: FrsMarkType.N,
		edgeTypes: [FrsEdgeType.SN, FrsEdgeType.NA, FrsEdgeType.NB, FrsEdgeType.NMe, FrsEdgeType.NPog],
	},
	{
		id: FrsMarkType.Spa,
		edgeTypes: [FrsEdgeType.SpaSpp],
	},
	{
		id: FrsMarkType.Spp,
		edgeTypes: [FrsEdgeType.SpaSpp, FrsEdgeType.SppA],
	},
	{
		id: FrsMarkType.Sp,
		edgeTypes: [],
		isGenerated: true,
	},
	{
		id: FrsMarkType.A,
		edgeTypes: [FrsEdgeType.SppA, FrsEdgeType.NA],
	},
	{
		id: FrsMarkType.Ar,
		edgeTypes: [FrsEdgeType.ArGo],
	},
	{
		id: FrsMarkType.Me,
		edgeTypes: [FrsEdgeType.NMe, FrsEdgeType.MeGo],
	},
	{
		id: FrsMarkType.Pog,
		edgeTypes: [FrsEdgeType.NPog],
	},
	{
		id: FrsMarkType.B,
		edgeTypes: [FrsEdgeType.NB],
	},
	{
		id: FrsMarkType.Tgp,
		edgeTypes: [],
	},
	{
		id: FrsMarkType.Tgp,
		edgeTypes: [],
	},
	{
		id: FrsMarkType.Tga,
		edgeTypes: [],
	},
	{
		id: FrsMarkType.Go,
		edgeTypes: [FrsEdgeType.ArGo, FrsEdgeType.MeGo, FrsEdgeType.Helper],
		isGenerated: true,
	},
	{
		id: FrsMarkType.Goa,
		edgeTypes: [FrsEdgeType.GoaPog2],
	},
	{
		id: FrsMarkType.InOK1,
		edgeTypes: [FrsEdgeType.InOK1ApOK1],
	},
	{
		id: FrsMarkType.ApOK1,
		edgeTypes: [FrsEdgeType.InOK1ApOK1],
	},
	{
		id: FrsMarkType.InUK1,
		edgeTypes: [FrsEdgeType.InUK1ApUK1],
	},
	{
		id: FrsMarkType.ApUK1,
		edgeTypes: [FrsEdgeType.InUK1ApUK1],
	},
	{
		id: FrsMarkType.VPOcP,
		edgeTypes: [FrsEdgeType.VPOcPHPOcP],
		isGenerated: true,
	},
	{
		id: FrsMarkType.HPOcP,
		edgeTypes: [FrsEdgeType.VPOcPHPOcP],
	},
	{
		id: FrsMarkType.Ls,
		edgeTypes: [],
	},
	{
		id: FrsMarkType.Li,
		edgeTypes: [],
	},
	{
		id: FrsMarkType.ProN,
		edgeTypes: [FrsEdgeType.ProNPog2],
	},
	{
		id: FrsMarkType.Pog2,
		edgeTypes: [FrsEdgeType.ProNPog2, FrsEdgeType.GoaPog2],
	},
]
