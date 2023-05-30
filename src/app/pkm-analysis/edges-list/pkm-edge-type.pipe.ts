import { Pipe, PipeTransform } from '@angular/core'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { PkmEdgeType } from '../edge/pkm-edge'
import { PkmEdgeOkklusion } from '../edge/pkm-edges-okklusion'
import { PkmEdgeTranversal } from '../edge/pkm-edges-transversal'
import { PkmEdgeZahnBreite } from '../edge/pkm-edges-zahn-breite'
import { PkmEdgeZahnGruppe } from '../edge/pkm-edges-zahn-gruppe'

@Pipe({
	name: 'translatePkmEdgeType',
	standalone: true,
	pure: true,
})
export class PkmEdgeTypePipe implements PipeTransform {
	transform(type: PkmEdgeType): string {
		return pkmEdgeTypeMapping[type]
	}
}

const pkmEdgeTypeMapping: { [key: string]: string } = {
	[PkmEdgeZahnBreite.Zahn11]: t('PkmEdgeZahnBreite.Edge.Zahn11'),
	[PkmEdgeZahnBreite.Zahn12]: t('PkmEdgeZahnBreite.Edge.Zahn12'),
	[PkmEdgeZahnBreite.Zahn13]: t('PkmEdgeZahnBreite.Edge.Zahn13'),
	[PkmEdgeZahnBreite.Zahn14]: t('PkmEdgeZahnBreite.Edge.Zahn14'),
	[PkmEdgeZahnBreite.Zahn15]: t('PkmEdgeZahnBreite.Edge.Zahn15'),
	[PkmEdgeZahnBreite.Zahn16]: t('PkmEdgeZahnBreite.Edge.Zahn16'),
	[PkmEdgeZahnBreite.Zahn21]: t('PkmEdgeZahnBreite.Edge.Zahn21'),
	[PkmEdgeZahnBreite.Zahn22]: t('PkmEdgeZahnBreite.Edge.Zahn22'),
	[PkmEdgeZahnBreite.Zahn23]: t('PkmEdgeZahnBreite.Edge.Zahn23'),
	[PkmEdgeZahnBreite.Zahn24]: t('PkmEdgeZahnBreite.Edge.Zahn24'),
	[PkmEdgeZahnBreite.Zahn25]: t('PkmEdgeZahnBreite.Edge.Zahn25'),
	[PkmEdgeZahnBreite.Zahn26]: t('PkmEdgeZahnBreite.Edge.Zahn26'),
	[PkmEdgeZahnBreite.Zahn31]: t('PkmEdgeZahnBreite.Edge.Zahn31'),
	[PkmEdgeZahnBreite.Zahn32]: t('PkmEdgeZahnBreite.Edge.Zahn32'),
	[PkmEdgeZahnBreite.Zahn33]: t('PkmEdgeZahnBreite.Edge.Zahn33'),
	[PkmEdgeZahnBreite.Zahn34]: t('PkmEdgeZahnBreite.Edge.Zahn34'),
	[PkmEdgeZahnBreite.Zahn35]: t('PkmEdgeZahnBreite.Edge.Zahn35'),
	[PkmEdgeZahnBreite.Zahn36]: t('PkmEdgeZahnBreite.Edge.Zahn36'),
	[PkmEdgeZahnBreite.Zahn41]: t('PkmEdgeZahnBreite.Edge.Zahn41'),
	[PkmEdgeZahnBreite.Zahn42]: t('PkmEdgeZahnBreite.Edge.Zahn42'),
	[PkmEdgeZahnBreite.Zahn43]: t('PkmEdgeZahnBreite.Edge.Zahn43'),
	[PkmEdgeZahnBreite.Zahn44]: t('PkmEdgeZahnBreite.Edge.Zahn44'),
	[PkmEdgeZahnBreite.Zahn45]: t('PkmEdgeZahnBreite.Edge.Zahn45'),
	[PkmEdgeZahnBreite.Zahn46]: t('PkmEdgeZahnBreite.Edge.Zahn46'),

	[PkmEdgeZahnGruppe.OkStuetzR]: t('PkmEdgeZahnGruppe.Edge.OkStuetzR'),
	[PkmEdgeZahnGruppe.OkStuetzL]: t('PkmEdgeZahnGruppe.Edge.OkStuetzL'),
	[PkmEdgeZahnGruppe.UkStuetzR]: t('PkmEdgeZahnGruppe.Edge.UkStuetzR'),
	[PkmEdgeZahnGruppe.UkStuetzL]: t('PkmEdgeZahnGruppe.Edge.UkStuetzL'),

	[PkmEdgeTranversal.OkVzb]: t('PkmEdgeTranversal.Edge.OkVzb'),
	[PkmEdgeTranversal.OkHzb]: t('PkmEdgeTranversal.Edge.OkHzb'),
	[PkmEdgeTranversal.UkVzb]: t('PkmEdgeTranversal.Edge.UkVzb'),
	[PkmEdgeTranversal.UkHzb]: t('PkmEdgeTranversal.Edge.UkHzb'),

	[PkmEdgeOkklusion.Overbite]: t('PkmEdgeOkklusion.Edge.Overbite'),
	[PkmEdgeOkklusion.Overjet]: t('PkmEdgeOkklusion.Edge.Overjet'),
}
