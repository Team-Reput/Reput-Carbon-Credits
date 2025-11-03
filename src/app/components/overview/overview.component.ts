import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProjectData {
  title: string;
  location: string;
  verifiedBy: string;
  vintage: string;
  projectType: string;
  vcsNumber: string;
  description: string;
  fullDescription: string;
  features: string[];
  pricePerTonne: number;
  selectedQuantity: number;
  creditedTo: string;
  publicMessage: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  project: ProjectData = {
    title: 'Vent du Midi',
    location: 'Corsica, France',
    verifiedBy: 'Verra',
    vintage: '2014',
    projectType: 'Forestry Conservation',
    vcsNumber: 'VCS 985',
    description: 'This ground breaking biodiversity restoration project in Panama focuses on creating vital forest corridors that connect fragmented ecosystems while providing sustainable livelihoods for local communities. Through innovative agroforestry techniques, we\'re not just planting trees – we\'re rebuilding entire ecosystems. Our approach combines traditional ecological knowledge with modern conservation science, ensuring that every tree planted contributes to both carbon sequestration and biodiversity carbon.',
    fullDescription: 'This ground breaking biodiversity restoration project in Panama focuses on creating vital forest corridors that connect fragmented ecosystems while providing sustainable livelihoods for local communities. Through innovative agroforestry techniques, we\'re not just planting trees – we\'re rebuilding entire ecosystems. Our approach combines traditional ecological knowledge with modern conservation science, ensuring that every tree planted contributes to both carbon sequestration and biodiversity carbon. The project works closely with indigenous communities to ensure traditional land rights are respected while creating new economic opportunities through sustainable forestry practices.',
    features: [
      'REDD+ Project',
      'Protecting 1.35M hectares',
      'Supporting 50+ communities'
    ],
    pricePerTonne: 400.00,
    selectedQuantity: 10,
    creditedTo: 'ABFL Pvt Ltd',
    publicMessage: 'Last month offset'
  };

  projectOverviewExpanded = true;
  retirementDetailsExpanded = true;
  paymentInfoExpanded = true;
  showFullDescription = false;

  vatRate = 0.00;

  paymentMethods = [
    'Credit & Debit Cards (Visa, Mastercard, Amex)',
    'Bank Transfer (ACH, Wire)',
    'Cryptocurrency (Bitcoin, Ethereum, USDC)',
    'Corporate Purchase Orders'
  ];

  securityFeatures = [
    '256-bit SSL encryption',
    'PCI DSS compliant payment processing',
    'Zero personal data storage',
    'Blockchain verification'
  ];

  ngOnInit(): void {
    // Initialize component
  }

  toggleProjectOverview(): void {
    this.projectOverviewExpanded = !this.projectOverviewExpanded;
  }

  toggleRetirementDetails(): void {
    this.retirementDetailsExpanded = !this.retirementDetailsExpanded;
  }

  togglePaymentInfo(): void {
    this.paymentInfoExpanded = !this.paymentInfoExpanded;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  getDescription(): string {
    return this.showFullDescription ? this.project.fullDescription : this.project.description;
  }

  updateQuantity(quantity: number): void {
    if (quantity >= 1 && quantity <= 1000) {
      this.project.selectedQuantity = quantity;
    }
  }

  calculateSubtotal(): number {
    return this.project.pricePerTonne * this.project.selectedQuantity;
  }

  calculateVAT(): number {
    return this.calculateSubtotal() * this.vatRate;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateVAT();
  }

  buyNow(): void {
    console.log('Purchasing', this.project.selectedQuantity, 'tonnes');
    alert(`Processing purchase of ${this.project.selectedQuantity} tonnes for $${this.calculateTotal().toFixed(2)}`);
  }

  viewOnPolygonscan(): void {
    window.open('https://polygonscan.com', '_blank');
  }

  goBack(): void {
    window.history.back();
  }
}












// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-overview',
//   standalone: true,
//   imports: [],
//   templateUrl: './overview.component.html',
//   styleUrl: './overview.component.scss'
// })
// export class OverviewComponent {

// }
