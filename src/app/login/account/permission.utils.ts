import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AccountService } from './account.service'

export const canActivate: CanActivateFn = () => {
	if (!inject(AccountService).isAuthorized()) {
		inject(Router).navigateByUrl('/login')
		return false
	}
	return true
}
