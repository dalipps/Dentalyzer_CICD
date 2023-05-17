import { Routes } from '@angular/router'
import { FrsAnalysisComponent } from './frs-analysis'
import { frsStoreInitResolver } from './frs-analysis/resolver/frs-store-init.resolver'
import { HomeComponent } from './home/home.component'
import { PkmAnalysisComponent } from './pkm-analysis/pkm-analysis.component'

export const globalRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'frs-analysis',
		component: FrsAnalysisComponent,
		resolve: { init: frsStoreInitResolver },
	},
	{
		path: 'analysis-3d',
		component: PkmAnalysisComponent,
	},
]
