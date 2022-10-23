import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loading } from 'src/app/utils/constants';
import { UtilService } from 'src/app/utils/util.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignup: boolean = false;
  username: string = '';
  isLoading: boolean = false;
  subscription = new Subscription();
  password: string = '';

  constructor(private auth: AuthService, private utils: UtilService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.utils.isLoading$.subscribe((l) => {
        console.log(l.key);
        l.key == Loading.AUTH
          ? (this.isLoading = l.state)
          : (this.isLoading = false);
      })
    );
  }

  signup() {
    this.auth.register({ username: this.username, password: this.password });
  }
  login() {
    this.auth.login({ username: this.username, password: this.password });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
