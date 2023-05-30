import { PkmEdgeOkklusion } from '../edge/pkm-edges-okklusion'
import { PkmEdgeTranversal } from '../edge/pkm-edges-transversal'
import { PkmEdgeZahnBreite } from '../edge/pkm-edges-zahn-breite'
import { PkmEdgeZahnGruppe } from '../edge/pkm-edges-zahn-gruppe'

export const pkmPdfMapping: { [key: string]: string } = {
	[PkmEdgeZahnBreite.Zahn11]: 'Text8',
	[PkmEdgeZahnBreite.Zahn12]: 'Text7',
	[PkmEdgeZahnBreite.Zahn13]: 'Text6',
	[PkmEdgeZahnBreite.Zahn14]: 'Text5',
	[PkmEdgeZahnBreite.Zahn15]: 'Text4',
	[PkmEdgeZahnBreite.Zahn16]: 'Text3',
	[PkmEdgeZahnBreite.Zahn21]: 'Text9',
	[PkmEdgeZahnBreite.Zahn22]: 'Text10',
	[PkmEdgeZahnBreite.Zahn23]: 'Text11',
	[PkmEdgeZahnBreite.Zahn24]: 'Text12',
	[PkmEdgeZahnBreite.Zahn25]: 'Text13',
	[PkmEdgeZahnBreite.Zahn26]: 'Text14',
	[PkmEdgeZahnBreite.Zahn31]: 'Text21',
	[PkmEdgeZahnBreite.Zahn32]: 'Text22',
	[PkmEdgeZahnBreite.Zahn33]: 'Text23',
	[PkmEdgeZahnBreite.Zahn34]: 'Text24',
	[PkmEdgeZahnBreite.Zahn35]: 'Text25',
	[PkmEdgeZahnBreite.Zahn36]: 'Text26',
	[PkmEdgeZahnBreite.Zahn41]: 'Text20',
	[PkmEdgeZahnBreite.Zahn42]: 'Text19',
	[PkmEdgeZahnBreite.Zahn43]: 'Text18',
	[PkmEdgeZahnBreite.Zahn44]: 'Text17',
	[PkmEdgeZahnBreite.Zahn45]: 'Text16',
	[PkmEdgeZahnBreite.Zahn46]: 'Text15',

	[PkmEdgeZahnGruppe.OkStuetzR]: 'rechtsIst',
	[PkmEdgeZahnGruppe.OkStuetzL]: 'linksIst',
	[PkmEdgeZahnGruppe.UkStuetzR]: 'rechtsIst2',
	[PkmEdgeZahnGruppe.UkStuetzL]: 'linksIst2',

	[PkmEdgeTranversal.OkVzb]: 'VZB44OKmm',
	[PkmEdgeTranversal.OkHzb]: 'HZB66OKmm',
	[PkmEdgeTranversal.UkVzb]: 'VZB44UKmm',
	[PkmEdgeTranversal.UkHzb]: 'HZB66UKmm',

	[PkmEdgeOkklusion.Overjet]: 'Overjet',
	[PkmEdgeOkklusion.Overbite]: 'Overbite',
}
