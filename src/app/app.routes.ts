import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { Analysis2dComponent } from './analysis2d/analysis2d.component'
import { Analysis3dComponent } from './analysis3d/analysis3d.component'

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
		path: 'analysis-2d',
		component: Analysis2dComponent,
	},
	{
		path: 'anaylsis-3d',
		component: Analysis3dComponent,
	},
]
