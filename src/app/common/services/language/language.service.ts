import { Injectable } from '@angular/core'
import { Language } from '@dentalyzer/enums'

@Injectable({
	providedIn: 'root',
})
export class LanguageService {
	private readonly storageKey = 'DENT_LANGUAGE'

	constructor() {}

	saveLanguage(language: Language): void {
		localStorage.setItem(this.storageKey, language)
	}

	getCurrentLanguage(): Language | undefined {
		const storedValue = localStorage.getItem(this.storageKey)

		switch (storedValue) {
			case Language.English:
				return Language.English
			case Language.German:
				return Language.German
			default:
				return undefined
		}
	}
}
