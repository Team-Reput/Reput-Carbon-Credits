// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-portfolio',
//   standalone: true,
//   imports: [],
//   templateUrl: './portfolio.component.html',
//   styleUrl: './portfolio.component.scss'
// })
// export class PortfolioComponent {

// }


import { Component } from '@angular/core';
import { NavbarComponent } from '../../../common/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  searchText = '';
  walletPopup = false;

  walletAmount = 1200;
  walletAddress = '0xb6ff93d686288cbfb87e6a1b8f26ad9d35ce99ac';

  assets = [
    {
      projectName: 'Vent du Midi',
      standard: 'Gold Standard',
      vintage: 2023,
      expiry: 'Sep 2, 2028',
      quantity: '5 tCO2e',
      price: 240,
    },
    {
      projectName: 'Verde Biomassa Italia',
      standard: 'Verra Registry',
      vintage: 2025,
      expiry: 'Sep 1, 2029',
      quantity: '12 tCO2e',
      price: 195,
    },
    {
      projectName: 'IberHydro',
      standard: 'Gold Standard',
      vintage: 2022,
      expiry: 'Aug 21, 2027',
      quantity: '10 tCO2e',
      price: 220,
    },
    {
      projectName: 'AlpenTherm Geo',
      standard: 'EU ETS',
      vintage: 2023,
      expiry: 'Aug 15, 2028',
      quantity: '4 tCO2e',
      price: 240,
    },
  ];

  filteredAssets = [...this.assets];

  applyFilter() {
    this.filteredAssets = this.assets.filter((a) =>
      a.projectName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleFilter() {
    console.log('Filter clicked');
  }

  openWalletPopup() {
    this.walletPopup = true;
  }

  closePopup() {
    this.walletPopup = false;
  }

  copyAddress() {
    navigator.clipboard.writeText(this.walletAddress);
    alert('Address Copied');
  }
}
