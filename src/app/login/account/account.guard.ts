import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Path } from 'src/app/app.routes'
import { AccountService } from './account.service'

export const isAuthorized: CanActivateFn = () => {
	if (!inject(AccountService).isAuthorized()) {
		inject(Router).navigateByUrl(Path.Login)
		return false
	}
	return true
}

export const isNotAuthorized: CanActivateFn = () => {
	if (inject(AccountService).isAuthorized()) {
		inject(Router).navigateByUrl(Path.Home)
		return false
	}
	return true
}
