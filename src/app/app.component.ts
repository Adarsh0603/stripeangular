import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Models/models';
import { AuthService } from './Modules/auth/auth.service';
import { Loading } from './utils/constants';
import { UtilService } from './utils/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user?: User | null;
  isTryingAutoLogin: boolean = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private utils: UtilService
  ) {}
  ngOnInit(): void {
    this.utils.isLoading$.subscribe((l) => {
      if (l.key == Loading.AUTO_LOGIN) {
        this.isTryingAutoLogin = l.state;
      }
    });
    this.auth.autoLogin();
    this.auth.user$.subscribe((user) => {
      if (user == null) {
        this.user = null;
        this.router.navigate(['/auth']);
      } else {
        this.user = user;
        this.router.navigate(['/']);
      }
    });
  }
}
