import { Pipe, PipeTransform } from '@angular/core'
import { marker as t } from '@biesbjerg/ngx-translate-extract-marker'
import { PkmEdgeGroupType, PkmEdgeType } from '../edge/pkm-edge'

@Pipe({
	name: 'translatePkmEdgeGroup',
	standalone: true,
	pure: true,
})
export class PkmEdgeGroupPipe implements PipeTransform {
	transform(type: PkmEdgeType): string {
		return pkmEdgeGroupTranslations[type]
	}
}

const pkmEdgeGroupTranslations: { [key: string]: string } = {
	[PkmEdgeGroupType.Zahnbreite]: t('PkmEdgeGroup.Zahnbreite.Name'),
	[PkmEdgeGroupType.Zahngruppe]: t('PkmEdgeGroup.Zahngruppe.Name'),
	[PkmEdgeGroupType.Transversal]: t('PkmEdgeGroup.Transversal.Name'),
	[PkmEdgeGroupType.Okklusion]: t('PkmEdgeGroup.Okklusion.Name'),
}
