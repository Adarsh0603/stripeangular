import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDto } from 'src/app/dto/dtos';
import { User } from 'src/app/Models/models';
import { Loading, Local } from 'src/app/utils/constants';
import { UtilService } from 'src/app/utils/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;
  user$ = new BehaviorSubject<User | null>(null);
  obs!: Observable<any>;
  constructor(
    private http: HttpClient,
    private notifier: NotifierService,
    private utils: UtilService
  ) {}

  register(userDto: UserDto) {
    this.utils.setLoading(Loading.AUTH, true);
    this.obs = this.http.post(
      `${environment.API.baseUrl}/auth/register`,
      userDto
    );
    this.handleAuthSubscription('Registration Successfull');
  }

  login(userDto: UserDto) {
    this.utils.setLoading(Loading.AUTH, true);
    this.obs = this.http.post(`${environment.API.baseUrl}/auth/login`, userDto);
    this.handleAuthSubscription('Login Successful');
  }

  autoLogin() {
    this.utils.setLoading(Loading.AUTO_LOGIN, true);
    this.currentUser = this.utils.GetLocal(Local.LOGGED_USER);
    if (!this.currentUser) {
      this.utils.setLoading(Loading.AUTO_LOGIN, false);
      return;
    }
    this.http
      .get(`${environment.API.baseUrl}/auth/checktoken`, {
        headers: {
          Authorization: `Bearer ${this.currentUser?.token}`,
        },
      })
      .subscribe({
        next: (res) => this.user$.next(this.currentUser),
        error: (error) => {
          this.currentUser = null;
          this.user$.next(this.currentUser);
          this.utils.setLoading(Loading.AUTO_LOGIN, false);
        },
      });
  }

  handleAuthSubscription(notification: any) {
    this.obs.subscribe({
      next: (res: { token: string }) => {
        this.handleToken(res.token);
        this.utils.setLoading(Loading.AUTH, false);
        this.notifier.notify('success', notification);
      },
      error: (error) => {
        this.currentUser = null;
        this.user$.next(this.currentUser);
        this.utils.setLoading(Loading.AUTH, false);

        this.utils.errorHandler(error);
      },
    });
  }
  handleToken(token: string) {
    this.currentUser = { token: token };
    this.utils.SetLocal(Local.LOGGED_USER, this.currentUser);
    this.user$.next(this.currentUser);
  }
  logout() {
    localStorage.removeItem(Local.LOGGED_USER);
    this.currentUser = null;
    this.user$.next(this.currentUser);
  }
}
