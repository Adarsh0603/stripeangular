import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { from } from 'rxjs';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  data: any = '';
  planId: Number = 0;
  stripe: Stripe | null = null;
  elements: any;
  ngOnInit(): void {
    this.setupStripe();
    this.route.params.subscribe((params) => {
      this.planId = params['id'];
      this.getClientSecret();
    });
  }
  setupStripe() {
    var stripePromise = loadStripe('stripe_pk_test_key');
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
    var result;
    const cp = this.stripe!.confirmPayment({
      elements: this.elements,

      redirect: 'if_required',
    });
    const cpObs = from(cp);
    cpObs.subscribe((paymentIntentResult) => {
      console.log(paymentIntentResult);
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
