import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { from } from 'rxjs';
import { UtilService } from 'src/app/utils/util.service';
import { Loading } from 'src/app/utils/constants';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private util: UtilService,
    private api: ApiService,
    private router: Router
  ) {}
  data: any = '';
  planId: Number = 0;
  isLoading: boolean = false;
  stripe: Stripe | null = null;
  elements: any;
  ngOnInit(): void {
    this.setupStripe();
    this.util.isLoading$.subscribe((res) => {
      if (res.key == Loading.CHECKOUT) {
        this.isLoading = res.state;
      }
    });
    this.route.params.subscribe((params) => {
      this.planId = params['id'];
      this.getClientSecret();
    });
  }
  setupStripe() {
    var stripePromise = loadStripe(
      'pk_test_51LsKFsSIkWfn8fp8ADycTVF3P0v2BUd1fwnKO7HLuRaGbMQk00nhLKBSJznlyqpeH4l1GVbJJKL4Q3L9Y9C5bOAS00RutKge0R'
    );
    var stripeObs = from(stripePromise);
    stripeObs.subscribe((res) => {
      this.stripe = res;
      const options: StripeElementsOptions = {
        clientSecret: this.data.clientSecret,
        appearance: {
          theme: 'flat',
        },
      };

      this.elements = this.stripe!.elements(options);

      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
    });
  }

  submitPaymentDetails() {
    event?.preventDefault();
    this.util.setLoading(Loading.CHECKOUT, true);

    var result;
    const cp = this.stripe!.confirmPayment({
      elements: this.elements,

      redirect: 'if_required',
    });
    const cpObs = from(cp);
    cpObs.subscribe({
      next: (paymentIntentResult) => {
        console.log(paymentIntentResult);
        this.util.setLoading(Loading.CHECKOUT, false);
        if (paymentIntentResult.paymentIntent?.status == 'succeeded') {
          this.router.navigate(['/success']);
        } else this.router.navigate(['/failure']);
      },
      error: (error) => {
        this.util.setLoading(Loading.CHECKOUT, false);
        this.util.errorHandler(error);
      },
    });
  }
  getClientSecret() {
    this.api
      .post('/stripe/clientsecret', { planId: this.planId })
      .subscribe((res) => {
        this.data = res;
        this.setupStripe();
      });
  }
}
