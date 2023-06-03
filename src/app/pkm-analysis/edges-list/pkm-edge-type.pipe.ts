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
	[PkmEdgeZahnBreite.Zahn11]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn11'),
	[PkmEdgeZahnBreite.Zahn12]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn12'),
	[PkmEdgeZahnBreite.Zahn13]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn13'),
	[PkmEdgeZahnBreite.Zahn14]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn14'),
	[PkmEdgeZahnBreite.Zahn15]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn15'),
	[PkmEdgeZahnBreite.Zahn16]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn16'),
	[PkmEdgeZahnBreite.Zahn21]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn21'),
	[PkmEdgeZahnBreite.Zahn22]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn22'),
	[PkmEdgeZahnBreite.Zahn23]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn23'),
	[PkmEdgeZahnBreite.Zahn24]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn24'),
	[PkmEdgeZahnBreite.Zahn25]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn25'),
	[PkmEdgeZahnBreite.Zahn26]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn26'),
	[PkmEdgeZahnBreite.Zahn31]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn31'),
	[PkmEdgeZahnBreite.Zahn32]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn32'),
	[PkmEdgeZahnBreite.Zahn33]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn33'),
	[PkmEdgeZahnBreite.Zahn34]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn34'),
	[PkmEdgeZahnBreite.Zahn35]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn35'),
	[PkmEdgeZahnBreite.Zahn36]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn36'),
	[PkmEdgeZahnBreite.Zahn41]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn41'),
	[PkmEdgeZahnBreite.Zahn42]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn42'),
	[PkmEdgeZahnBreite.Zahn43]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn43'),
	[PkmEdgeZahnBreite.Zahn44]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn44'),
	[PkmEdgeZahnBreite.Zahn45]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn45'),
	[PkmEdgeZahnBreite.Zahn46]: t('PkmEdgeGroup.Zahnbreite.Edge.Zahn46'),

	[PkmEdgeZahnGruppe.OkStuetzR]: t('PkmEdgeGroup.Zahngruppe.Edge.OkStuetzR'),
	[PkmEdgeZahnGruppe.OkStuetzL]: t('PkmEdgeGroup.Zahngruppe.Edge.OkStuetzL'),
	[PkmEdgeZahnGruppe.UkStuetzR]: t('PkmEdgeGroup.Zahngruppe.Edge.UkStuetzR'),
	[PkmEdgeZahnGruppe.UkStuetzL]: t('PkmEdgeGroup.Zahngruppe.Edge.UkStuetzL'),

	[PkmEdgeTranversal.OkVzb]: t('PkmEdgeGroup.Transversal.Edge.OkVzb'),
	[PkmEdgeTranversal.OkHzb]: t('PkmEdgeGroup.Transversal.Edge.OkHzb'),
	[PkmEdgeTranversal.UkVzb]: t('PkmEdgeGroup.Transversal.Edge.UkVzb'),
	[PkmEdgeTranversal.UkHzb]: t('PkmEdgeGroup.Transversal.Edge.UkHzb'),

	[PkmEdgeOkklusion.Overbite]: t('PkmEdgeGroup.Okklusion.Edge.Overbite'),
	[PkmEdgeOkklusion.Overjet]: t('PkmEdgeGroup.Okklusion.Edge.Overjet'),
}
