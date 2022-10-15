import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/Models/models';
import { ApiService } from 'src/app/utils/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  plans: Plan[] | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans() {
    this.api.get('/plans').subscribe({
      next: (res: any) => {
        this.plans = res;
        console.log(this.plans);
      },
    });
  }
  choosePlan(planId: string) {}
}
