
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
 

 
export class CheckoutComponent {
  paymentForm: FormGroup;

  countries = ['India', 'United States', 'United Kingdom', 'Canada'];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expiry: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      country: ['India', Validators.required]
    });
  }

  pay() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    console.log('Payment Details:', this.paymentForm.value);
    alert('Payment submitted (UI Demo Only)');
  }
}
