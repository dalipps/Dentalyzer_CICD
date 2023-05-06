import { Routes } from '@angular/router'
import { Analysis3dComponent } from './analysis3d/analysis3d.component'
import { FrsAnalysisComponent } from './frs-analysis'
import { HomeComponent } from './home/home.component'

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
	},
	{
		path: 'anaylsis-3d',
		component: Analysis3dComponent,
	},
]
