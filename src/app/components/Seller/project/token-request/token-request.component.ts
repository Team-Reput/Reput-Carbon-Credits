// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-token-request',
//   standalone: true,
//   imports: [],
//   templateUrl: './token-request.component.html',
//   styleUrl: './token-request.component.scss'
// })
// export class TokenRequestComponent {

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TokenizationOverview {
  projectName: string;
  registryProjectId: string;
  availableForTokenization: string;
  registryName: string;
  totalCreditsIssued: string;
  lastUpdated: string;
}

interface BlockchainNetwork {
  id: string;
  name: string;
}

@Component({
  selector: 'app-token-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './token-request.component.html',
  styleUrls: ['./token-request.component.scss']
})

export class TokenRequestComponent {
  // Tokenization Overview Data
  tokenizationOverview: TokenizationOverview = {
    projectName: 'GreenWind Solar Hybrid Project',
    registryProjectId: 'VCS-11876',
    availableForTokenization: '25,000 VCUs',
    registryName: 'Verra',
    totalCreditsIssued: '25,000 VCUs',
    lastUpdated: '15 Oct 2025'
  };

  // Form Data
  numberOfCredits: string = '';
  selectedBlockchain: string = '';
  destinationWallet: string = '0x4F2d87C391E88F12b07E19C7a04';
  confirmWallet: string = '';
  referenceName: string = '';

  // Blockchain Networks
  blockchainNetworks: BlockchainNetwork[] = [
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'polygon', name: 'Polygon' },
    { id: 'binance', name: 'Binance Smart Chain' },
    { id: 'avalanche', name: 'Avalanche' }
  ];

  // Checkboxes
  confirmOwnership: boolean = false;
  understandRetirement: boolean = false;
  acknowledgeNoReissue: boolean = false;

  // Validation
  maxCredits: number = 25000;
  formSubmitted: boolean = false;

  constructor() {}

  isFormValid(): boolean {
    return (
      this.numberOfCredits !== '' &&
      parseInt(this.numberOfCredits) > 0 &&
      parseInt(this.numberOfCredits) <= this.maxCredits &&
      this.selectedBlockchain !== '' &&
      this.destinationWallet !== '' &&
      this.confirmWallet !== '' &&
      this.destinationWallet === this.confirmWallet &&
      this.confirmOwnership &&
      this.understandRetirement &&
      this.acknowledgeNoReissue
    );
  }

  onCreditsInput(event: any): void {
    const value = event.target.value;
    if (value && parseInt(value) > this.maxCredits) {
      this.numberOfCredits = this.maxCredits.toString();
    }
  }

  submitTokenizationRequest(): void {
    if (this.isFormValid()) {
      this.formSubmitted = true;
      console.log('Tokenization Request Submitted:', {
        numberOfCredits: this.numberOfCredits,
        blockchain: this.selectedBlockchain,
        destinationWallet: this.destinationWallet,
        referenceName: this.referenceName
      });
      // Add your submission logic here
    }
  }

  backToProjectDetails(): void {
    console.log('Back to project details');
    // Add navigation logic here
  }

  openAMLPolicy(): void {
    window.open('https://example.com/aml-kyc-policy', '_blank');
  }
}