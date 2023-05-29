import { Injectable } from '@angular/core'
import { accountsConfig } from './accounts.config'
import { getCookie, removeCookie, setCookie } from './cookie.utils'

const TokenKey = 'dent-jwt'

interface User {
	name: string
}

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private _currentUser?: User

	get user(): User {
		return this._currentUser ?? { name: getCookie(TokenKey) }
	}

	login(username: string, password: string): void {
		if (accountsConfig.some((account) => account.username === username && account.password === password)) {
			this._currentUser = { name: username }
			setCookie(TokenKey, username)
			return
		}
		throw new Error('User not authorized')
	}

	logout(): void {
		removeCookie(TokenKey)
	}

	isAuthorized(): boolean {
		return !!getCookie(TokenKey)
	}
}
