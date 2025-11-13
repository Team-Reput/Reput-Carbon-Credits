import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  Router, RouterModule  } from '@angular/router'


interface ProductDetail {
  title: string;
  heroImage: string;
  verificationBadge: string;
  vintage: string;
  location: string;
  projectType: string;
  sdgs: string;
  pricePerTonne: number;
  currency: string;
  unit: string;
  overview: {
    title: string;
    description: string;
  };
  details: {
    country: string;
    company: string;
    web: string;
    registry: string;
    validation: string;
    blockchainAddress: string;
    type: string;
    mechanism: string;
    characteristics: string;
    methodology: string;
  };
  sustainabilityGoals: {
    title: string;
    learnMoreText: string;
    learnMoreUrl: string;
    date: string;
    icons: string[];
  };
  vintageOptions: Array<{
    year: string;
    pricePerTonne: number;
    availableTonnes: number;
  }>;
  standardsCertifications: {
    title: string;
    items: any[];
  };
  verification: {
    title: string;
    registry: string;
    issuedBy: string;
    validUntil: string;
    viewCertificateUrl: string;
  };
  methodologyPDD: {
    title: string;
    issuedBy: string;
    documentSize: string;
    documentUrl: string;
  };
  mapGallery: {
    title: string;
    mapImage: string;
    galleryImages: string[];
  };
  projectImpact: {
    title: string;
    impacts: Array<{
      title: string;
      image: string;
      icon?: string;
    }>;
  };
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  quantity: number = 10;
  selectedVintage: string = '2025 - $400/tones( 321224  available )';
  
  product: ProductDetail = {
    title: 'Vent du Midi',
    heroImage: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&h=500&fit=crop&q=80',
    verificationBadge: 'Verified by Verra',
    vintage: 'Vintage 2022',
    location: 'Corsica, France',
    projectType: 'Forestry Conservation',
    sdgs: '11/17 SDGs',
    pricePerTonne: 400.00,
    currency: '$',
    unit: 'CO₂e',
    overview: {
      title: 'Project Overview',
      description: 'ISO-compliant Life Cycle Assessment platform enabling large-scale wind projects to offset carbon emissions across Europe. This ground breaking biodiversity restoration project in Panama focuses on creating vital forest corridors that connect fragmented ecosystems while providing sustainable livelihoods for local communities. Through innovative agroforestry techniques, we\'re not just planting trees – we\'re rebuilding entire ecosystems. Our approach combines traditional ecological knowledge with modern conservation science, ensuring that every tree planted contribut'
    },
    details: {
      country: 'France',
      company: 'Bosques Amazonicos',
      web: 'www.web.com',
      registry: 'Verra Registry',
      validation: 'Dec 27, 2040',
      blockchainAddress: 'F4HFlR4QLVAULCYGOQVHXJJ5AYSH...',
      type: 'REDD+(Reducing Emissions from Deforestation and forest Degradation)',
      mechanism: 'Avoidance',
      characteristics: 'Biodiversity',
      methodology: 'VM0007 v1.5'
    },
    sustainabilityGoals: {
      title: 'UN Sustainable Development Goals',
      learnMoreText: 'Learn more about  the UN\'S SDGs',
      learnMoreUrl: 'https://sdgs.un.org/goals',
      date: '11/17',
      icons: [
        "assets/images/sdg1.png",
        "assets/images/zeroHunger.png",
        "assets/images/goodHealth.png",
        "assets/images/qualityEducation.png",
        "assets/images/genderEquality.png",
        "assets/images/cleanWater.png",
        "assets/images/affordableCleanEnergy.png",
        "assets/images/decentWork.png",
        "assets/images/climateAction.png",
        "assets/images/BelowWater.png",
        "assets/images/OnLand.png",
      ]
    },
    vintageOptions: [
      { year: '2025', pricePerTonne: 400, availableTonnes: 321224 },
      { year: '2024', pricePerTonne: 380, availableTonnes: 250000 },
      { year: '2023', pricePerTonne: 360, availableTonnes: 180000 }
    ],
    standardsCertifications: {
      title: 'Standards & Certifications',
      items: []
    },
    verification: {
      title: 'Verification',
      registry: 'Verra',
      issuedBy: 'Issued by Verra Standard Foundation',
      validUntil: 'Valid until Dec 27, 2040',
      viewCertificateUrl: '#'
    },
    methodologyPDD: {
      title: 'Methodology And  PDD',
      issuedBy: 'Issued by Verra',
      documentSize: 'Doc 22 kb',
      documentUrl: '#'
    },
    mapGallery: {
      title: 'Map & Gallery',
      mapImage: 'https://via.placeholder.com/600x400/C8E6C9/4CAF50?text=Project+Location+Map',
      galleryImages: [
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop'
      ]
    },
    projectImpact: {
      title: 'Project Impact',
      impacts: [
        {
          title: 'Bio Energy',
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop'
        },
        {
          title: 'Save Forest',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
          icon: 'CO₂'
        },
        {
          title: 'Regional Economic Development',
          image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=300&fit=crop'
        }
      ]
    }
  };

  
    constructor(  public router: Router) {  }
  
  

  overviewExpanded: boolean = true;
  detailsExpanded: boolean = true;
  sdgExpanded: boolean = true;
  standardsExpanded: boolean = false;
  verificationExpanded: boolean = true;
  methodologyExpanded: boolean = true;
  mapGalleryExpanded: boolean = true;
  projectImpactExpanded: boolean = true;

  get totalPrice(): number {
    return this.quantity * this.pricePerTonne;
  }

  get pricePerTonne(): number {
    const year = this.selectedVintage.split(' - ')[0];
    const selected = this.product.vintageOptions.find(v => v.year === year);
    return selected ? selected.pricePerTonne : this.product.pricePerTonne;
  }

  get availableTonnes(): number {
    const year = this.selectedVintage.split(' - ')[0];
    const selected = this.product.vintageOptions.find(v => v.year === year);
    return selected ? selected.availableTonnes : 0;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  toggleOverview(): void {
    this.overviewExpanded = !this.overviewExpanded;
  }

  toggleDetails(): void {
    this.detailsExpanded = !this.detailsExpanded;
  }

  toggleSDG(): void {
    this.sdgExpanded = !this.sdgExpanded;
  }

  toggleStandards(): void {
    this.standardsExpanded = !this.standardsExpanded;
  }

  toggleVerification(): void {
    this.verificationExpanded = !this.verificationExpanded;
  }

  toggleMethodology(): void {
    this.methodologyExpanded = !this.methodologyExpanded;
  }

  toggleMapGallery(): void {
    this.mapGalleryExpanded = !this.mapGalleryExpanded;
  }

  toggleProjectImpact(): void {
    this.projectImpactExpanded = !this.projectImpactExpanded;
  }

  buyNow(): void {
     this.router.navigate(['/over']);
    console.log('Buy Now clicked', {
      vintage: this.selectedVintage,
      quantity: this.quantity,
      total: this.totalPrice
    });
  }

  addToCart(): void {
    console.log('Add to Cart clicked', {
      vintage: this.selectedVintage,
      quantity: this.quantity,
      total: this.totalPrice
    });
  }

  makeOffer(): void {
    console.log('Make an Offer clicked');
  }

  goBack(): void {
    console.log('Back button clicked');
  }



  activeTab: string = 'credit';

  // Credit Vintages data
  creditData = [
    { year: 2019, issued: 245000, available: 12000, retired: 233000, price: 450 },
    { year: 2019, issued: 278000, available: 25000, retired: 253000, price: 400 },
    { year: 2019, issued: 312000, available: 89000, retired: 267000, price: 390 },
    { year: 2019, issued: 289000, available: 134000, retired: 193000, price: 350 }
  ];

  totalIssued = 1460000;
  currentAvailable = '350k';
  permanentRetired = '1.16M';

  // Transactions data
  transactions = [
    { country: 'India', date: 'Sep 2, 2025', transactionId: '0xb6ff686cbf888f26ad9d35ce7e93d6a1b2...', quantity: '5 tCO2e', price: '51.40' },
    { country: 'United States of America', date: 'Sep 1, 2025', transactionId: '0xb6ff93d686288cfb87e6a1bf26ad9d35c...', quantity: '12 tCO2e', price: '55.40' },
    { country: 'El Salvador', date: 'Aug 21, 2025', transactionId: '0xb6bf693d7e62b86ffa1bf28b6cad9d35c...', quantity: '10 tCO2e', price: '50011.40' },
    { country: 'Canada', date: 'Aug 15, 2025', transactionId: '0xb6b7e86ffa1bf28f693d8c8b626ad9d35c...', quantity: '4 tCO2e', price: '50011.40' }
  ];

  // Understanding Q&A data
  understandings = [
    { question: 'Why is the Gold Standard Registry important for this project?', answer: 'It ensures transparency and certification of emission reductions.', open: false },
    { question: 'What is a wind-based carbon offset project?', answer: 'It reduces carbon emissions by generating renewable wind energy.', open: false },
    { question: 'How is the price of $24,000 per ton determined?', answer: 'Based on market demand, certification, and project type.', open: false },
    { question: 'What guarantees the permanence of the emission reductions?', answer: 'Projects follow strict monitoring and third-party verification.', open: false },
    { question: 'How can buyers retire credits to meet their own net-zero targets?', answer: 'Buyers can request retirement through the registry for their offsets.', open: false }
  ];

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  toggleAnswer(index: number) {
    this.understandings[index].open = !this.understandings[index].open;
  }


  @ViewChild('slider', { static: false }) slider!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeftPos = 0;

  projects = [
    {
      name: "Verde Biomassa Italia",
      sdg: 7,
      image: "assets/images/verdeBiomass.png",
      description: "High-efficiency biomass facilities converting organic waste.",
      vintage: "2022 | 2025",
      country: "Italy",
      registry: "Verra Registry",
      industry: "Biomass",
      price: 100,
      available: "1050000"
    }, 
    {
      name: "Solaris Wind Farm",
      sdg: 13,
      image: "assets/images/solarSurya.png",
      description: "Large-scale wind farm generating clean energy.",
      vintage: "2021 | 2024",
      country: "Spain",
      registry: "Gold Standard",
      industry: "Wind Energy",
      price: 120,
      available: "850000"
    },
    {
      name: "AquaHydro Power",
      sdg: 6,
      image: "assets/images/deltaCapture.png",
      description: "Hydropower project utilizing water flow for energy.",
      vintage: "2020 | 2023",
      country: "Italy",
      registry: "Verra Registry",
      industry: "Hydropower",
      price: 110,
      available: "900000"
    },
    {
      name: "EcoForest Conservation",
      sdg: 15,
      image: "assets/images/alpenTherm.png",
      description: "Conservation project aimed at preserving forest ecosystems.",
      vintage: "2022 | 2025",
      country: "Brazil",
      registry: "Gold Standard",
      industry: "Forestry",
      price: 130,
      available: "750000"
    },
    {
      name: "Sunrise Solar Initiative",
      sdg: 7,
      image: "assets/images/solarSurya.png",
      description: "Solar energy project aimed at increasing renewable energy capacity.",
      vintage: "2021 | 2024",
      country: "USA",
      registry: "Gold Standard",
      industry: "Solar",
      price: 140,
      available: "600000"
    },
    {
      name: "GreenWave Tidal Energy",
      sdg: 13,
        image: "assets/images/project6.jpg",
        description: "Tidal energy project harnessing ocean tides for power generation.",
        vintage: "2020 | 2023",
        country: "UK",
        registry: "Verra Registry",
        industry: "Tidal Energy",
        price: 150,
        available: "500000"
    },
    {
        name: "BioCycle Waste-to-Energy",
        sdg: 12,
        image: "assets/images/alpenTherm.png",
        description: "Waste-to-energy project converting organic waste into renewable energy.",
        vintage: "2021 | 2024",
        country: "Germany",
        registry: "Gold Standard",
        industry: "Waste Management",
        price: 160,
        available: "400000"
    },
    {
        name: "TerraFirma Reforestation",
        sdg: 15,
        image: "assets/images/solarSurya.png",
        description: "Reforestation project focused on restoring degraded lands.",
        vintage: "2022 | 2025",
        country: "Kenya",
        registry: "Verra Registry",
        industry: "Forestry",
        price: 170,
        available: "300000"
    }
  ];

  scrollLeft() {
    this.slider.nativeElement.scrollLeft -= 330;
  }

  scrollRight() {
    this.slider.nativeElement.scrollLeft += 330;
  }

  startDrag(e: any) {
    this.isDragging = true;
    this.startX = e.pageX || e.touches[0].pageX;
    this.scrollLeftPos = this.slider.nativeElement.scrollLeft;
  }

  onDrag(e: any) {
    if (!this.isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - this.startX) * 1.2;
    this.slider.nativeElement.scrollLeft = this.scrollLeftPos - walk;
  }

  stopDrag() {
    this.isDragging = false;
  }



  backToDashboard(): void {
    this.router.navigate(['/dash']);
  }
}















// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface ProductDetail {
//   title: string;
//   heroImage: string;
//   verificationBadge: string;
//   vintage: string;
//   location: string;
//   projectType: string;
//   sdgs: string;
//   pricePerTonne: number;
//   currency: string;
//   unit: string;
//   overview: {
//     title: string;
//     description: string;
//   };
//   details: {
//     country: string;
//     company: string;
//     web: string;
//     registry: string;
//     validation: string;
//     blockchainAddress: string;
//     type: string;
//     mechanism: string;
//     characteristics: string;
//     methodology: string;
//   };
//   sustainabilityGoals: {
//     title: string;
//     learnMoreText: string;
//     learnMoreUrl: string;
//     date: string;
//     icons: string[];
//   };
//   vintageOptions: Array<{
//     year: string;
//     pricePerTonne: number;
//     availableTonnes: number;
//   }>;
// }

// @Component({
//   selector: 'app-product-detail',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.scss']
// })
// export class ProductDetailComponent {
//   quantity: number = 10;
//   selectedVintage: string = '2025 - $400/tones( 321224  available )';
  
//   product: ProductDetail = {
//     title: 'Vent du Midi',
//     heroImage: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&h=500&fit=crop&q=80',
//     verificationBadge: 'Verified by Verra',
//     vintage: 'Vintage 2022',
//     location: 'Corsica, France',
//     projectType: 'Forestry Conservation',
//     sdgs: '11/17 SDGs',
//     pricePerTonne: 400.00,
//     currency: '$',
//     unit: 'CO₂e',
//     overview: {
//       title: 'Project Overview',
//       description: 'ISO-compliant Life Cycle Assessment platform enabling large-scale wind projects to offset carbon emissions across Europe. This ground breaking biodiversity restoration project in Panama focuses on creating vital forest corridors that connect fragmented ecosystems while providing sustainable livelihoods for local communities. Through innovative agroforestry techniques, we\'re not just planting trees – we\'re rebuilding entire ecosystems. Our approach combines traditional ecological knowledge with modern conservation science, ensuring that every tree planted contribut'
//     },
//     details: {
//       country: 'France',
//       company: 'Bosques Amazonicos',
//       web: 'www.web.com',
//       registry: 'Verra Registry',
//       validation: 'Dec 27, 2040',
//       blockchainAddress: 'F4HFlR4QLVAULCYGOQVHXJJ5AYSH...',
//       type: 'REDD+(Reducing Emissions from Deforestation and forest Degradation)',
//       mechanism: 'Avoidance',
//       characteristics: 'Biodiversity',
//       methodology: 'VM0007 v1.5'
//     },
//     sustainabilityGoals: {
//       title: 'UN Sustainable Development Goals',
//       learnMoreText: 'Learn more about  the UN\'S SDGs',
//       learnMoreUrl: 'https://sdgs.un.org/goals',
//       date: '11/17',
//       icons: [
//         'https://via.placeholder.com/80x80/E5243B/ffffff?text=SDG+1',
//         'https://via.placeholder.com/80x80/DDA63A/ffffff?text=SDG+2',
//         'https://via.placeholder.com/80x80/4C9F38/ffffff?text=SDG+3',
//         'https://via.placeholder.com/80x80/C5192D/ffffff?text=SDG+4',
//         'https://via.placeholder.com/80x80/FF3A21/ffffff?text=SDG+5',
//         'https://via.placeholder.com/80x80/26BDE2/ffffff?text=SDG+6',
//         'https://via.placeholder.com/80x80/FCC30B/ffffff?text=SDG+7',
//         'https://via.placeholder.com/80x80/A21942/ffffff?text=SDG+8',
//         'https://via.placeholder.com/80x80/56C02B/ffffff?text=SDG+13',
//         'https://via.placeholder.com/80x80/0A97D9/ffffff?text=SDG+14',
//         'https://via.placeholder.com/80x80/3F7E44/ffffff?text=SDG+15'
//       ]
//     },
//     vintageOptions: [
//       { year: '2025', pricePerTonne: 400, availableTonnes: 321224 },
//       { year: '2024', pricePerTonne: 380, availableTonnes: 250000 },
//       { year: '2023', pricePerTonne: 360, availableTonnes: 180000 }
//     ]
//   };

//   overviewExpanded: boolean = true;
//   detailsExpanded: boolean = true;
//   sdgExpanded: boolean = true;

//   get totalPrice(): number {
//     return this.quantity * this.pricePerTonne;
//   }

//   get pricePerTonne(): number {
//     const year = this.selectedVintage.split(' - ')[0];
//     const selected = this.product.vintageOptions.find(v => v.year === year);
//     return selected ? selected.pricePerTonne : this.product.pricePerTonne;
//   }

//   get availableTonnes(): number {
//     const year = this.selectedVintage.split(' - ')[0];
//     const selected = this.product.vintageOptions.find(v => v.year === year);
//     return selected ? selected.availableTonnes : 0;
//   }

//   incrementQuantity(): void {
//     this.quantity++;
//   }

//   decrementQuantity(): void {
//     if (this.quantity > 1) {
//       this.quantity--;
//     }
//   }

//   toggleOverview(): void {
//     this.overviewExpanded = !this.overviewExpanded;
//   }

//   toggleDetails(): void {
//     this.detailsExpanded = !this.detailsExpanded;
//   }

//   toggleSDG(): void {
//     this.sdgExpanded = !this.sdgExpanded;
//   }

//   buyNow(): void {
//     console.log('Buy Now clicked', {
//       vintage: this.selectedVintage,
//       quantity: this.quantity,
//       total: this.totalPrice
//     });
//   }

//   addToCart(): void {
//     console.log('Add to Cart clicked', {
//       vintage: this.selectedVintage,
//       quantity: this.quantity,
//       total: this.totalPrice
//     });
//   }

//   makeOffer(): void {
//     console.log('Make an Offer clicked');
//   }

//   goBack(): void {
//     console.log('Back button clicked');
//   }
// }


















// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-product-detail',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './product-detail.component.html',
// //   styleUrl: './product-detail.component.scss'
// // })
// // export class ProductDetailComponent {

// // }

 