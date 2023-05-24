const CookieKeys_Expires = 'expires'

export function setCookie(name: string, value: string, expires = 360): void {
	const minutesFactor = 1000 * 60
	const now = new Date()
	const expireDate = new Date(now.getTime() + minutesFactor * expires).toUTCString()

	document.cookie = `${name}=${value};${CookieKeys_Expires}=${expireDate};`
}

export function removeCookie(name: string): void {
	document.cookie = name + '=; Max-Age=-99999999;'
}

export function getCookie(name: string): string {
	return document.cookie?.split(`${name}=`)?.[1]
}
