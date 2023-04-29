import { Routes } from '@angular/router'
import { AnalysisFrsComponent } from '@dentalyzer/analysis/frs'
import { Analysis3dComponent } from './analysis3d/analysis3d.component'
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
		path: 'analysis-frs',
		component: AnalysisFrsComponent,
	},
	{
		path: 'anaylsis-3d',
		component: Analysis3dComponent,
	},
]
