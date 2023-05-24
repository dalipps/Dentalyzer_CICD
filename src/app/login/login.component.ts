import { NgClass, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, Injector } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { Path } from '../app.routes'
import { BaseComponent } from '../common/base'
import { AccountService } from './account/account.service'

@Component({
	selector: 'dent-login',
	standalone: true,
	imports: [
		NgIf,
		NgClass,
		TranslateModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: './login.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent {
	readonly passwordMinLength = 8
	usernameErrorMessage?: string
	passwordErrorMessage?: string

	loginForm = new FormGroup({
		username: new FormControl('', { nonNullable: true }),
		password: new FormControl('', { nonNullable: true }),
	})
	get username() {
		return this.loginForm.controls.username
	}
	get password() {
		return this.loginForm.controls.password
	}

	constructor(private accountService: AccountService, private router: Router, injector: Injector) {
		super(injector)
	}

	login(): void {
		if (this.isInvalidUsername() || this.isInvalidPassword()) return
		try {
			this.accountService.login(this.username.value, this.password.value)
			this.router.navigateByUrl(Path.Home)
		} catch {
			this.password.setErrors({ authenticate: true })
		}
	}

	private isInvalidUsername(): boolean {
		if (!this.username.value) {
			this.username.setErrors({ required: true })
			return true
		}
		return false
	}

	private isInvalidPassword(): boolean {
		if (!this.password.value) {
			this.password.setErrors({ required: true })
			return true
		}
		if (this.password.value.length < this.passwordMinLength) {
			this.password.setErrors({ minLength: true })
			return true
		}
		return false
	}
}
