
import { Component, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule  } from '@angular/router'


// interface CardData {
//   title: string;
//   description: string;
//   vintage: string;
//   country: string;
//   countryFlag: string;
//   registry: string;
//   industry: string;
//   price: number;
//   available: number;
//   sdgScore: number;
//   imageUrl: string;
//   inStock: boolean;
//   category: string;
// }


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
 

 
export class CheckoutComponent {
  paymentForm: FormGroup;

  countries = ['India', 'United States', 'United Kingdom', 'Canada'];
  
  

  constructor(private fb: FormBuilder, public router: Router) {
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
 
    // if (this.paymentForm.invalid) {
    //   this.paymentForm.markAllAsTouched();
    //   return;
    // }
    
    console.log('Payment Details:', this.paymentForm.value);
    alert('Payment Successful! Thank you for your purchase.');

    this.router.navigate(['/proof']);
  }


  back() {
    this.router.navigate(['/dash']);
  }





  //  @Input() cardData: CardData = {
  //   title: 'Vent du Midi',
  //   description: 'ISO-compliant Life Cycle Assessment platform enabling large-scale wind projects to offset carbon emissions acro...',
  //   vintage: '2022 |2023',
  //   country: 'France',
  //   countryFlag: '🇫🇷',
  //   registry: 'Gold Standard',
  //   industry: 'Wind',
  //   price: 240,
  //   available: 890000,
  //   sdgScore: 11,
  //   imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80',
  //   inStock: true,
  //   category: 'Renewable Energy'
  // };

  // getSdgColors(): string[] {
  //   const colors = [
  //     '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21',
  //     '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367',
  //     '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B',
  //     '#00689D', '#19486A'
  //   ];
  //   return colors.slice(0, this.cardData.sdgScore);
  // }

  // getGradientString(): string {
  //   const colors = this.getSdgColors();
  //   const segmentSize = 100 / colors.length;
  //   let gradient = 'conic-gradient(';
    
  //   colors.forEach((color, index) => {
  //     const startAngle = index * segmentSize;
  //     const endAngle = (index + 1) * segmentSize;
  //     gradient += `${color} ${startAngle}% ${endAngle}%`;
  //     if (index < colors.length - 1) gradient += ', ';
  //   });
    
  //   gradient += ')';
  //   return gradient;
  // }

  // isFavorite: boolean = false;

  // toggleFavorite(): void {
  //   this.isFavorite = !this.isFavorite;
  // }


}
