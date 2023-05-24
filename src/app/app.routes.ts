import { Routes } from '@angular/router'
import { FrsAnalysisComponent } from './frs-analysis'
import { frsStoreInitResolver } from './frs-analysis/resolver/frs-store-init.resolver'
import { HomeComponent } from './home/home.component'
import { canActivate } from './login/account/permission.utils'
import { LoginComponent } from './login/login.component'
import { PkmAnalysisComponent } from './pkm-analysis/pkm-analysis.component'

export const Path = {
	Login: 'login',
	Home: 'home',
	FrsAnalysis: 'frs-analysis',
	PkmAnalysis: 'frs-analysis',
}

export const globalRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: Path.Home,
	},
	{
		path: Path.Home,
		component: HomeComponent,
		canActivate: [canActivate],
	},
	{
		path: Path.Login,
		component: LoginComponent,
	},
	{
		path: Path.FrsAnalysis,
		component: FrsAnalysisComponent,
		resolve: { init: frsStoreInitResolver },
		canActivate: [canActivate],
	},
	{
		path: Path.PkmAnalysis,
		component: PkmAnalysisComponent,
		canActivate: [canActivate],
	},
]
