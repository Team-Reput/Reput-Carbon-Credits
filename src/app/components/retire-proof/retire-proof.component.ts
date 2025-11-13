import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import {  Router, RouterModule  } from '@angular/router'
import { FormBuilder } from '@angular/forms';

interface CertificateData {
  projectName: string;
  verifiedBy: string;
  location: string;
  projectType: string;
  vcsNumber: string;
  description: string;
  fullDescription: string;
  retirementDate: string;
  verifiedTonnes: number;
  retirementMessage: string;
  account: string;
  txId: string;
  certificateNumber: string;
  blockchainAddress: string;
}

interface ProjectDetails {
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
}

interface VerificationStatus {
  blockchainVerified: boolean;
  registryApproved: boolean;
  permanentlyRetired: boolean;
}

@Component({
  selector: 'app-retire-proof',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './retire-proof.component.html',
  styleUrls: ['./retire-proof.component.scss']
})

export class RetireProofComponent implements OnInit {
  certificate: CertificateData = {
    projectName: 'Vent du Midi',
    verifiedBy: 'Verra',
    location: 'Corsica, France',
    projectType: 'Forestry Conservation',
    vcsNumber: 'VCS-985',
    description: 'Protecting 1.35 million hectares of pristine Amazon rainforest through verified carbon offset methodology',
    fullDescription: 'This ground breaking biodiversity restoration project in Panama focuses on creating vital forest corridors that connect fragmented ecosystems while providing sustainable livelihoods for local communities. Through innovative agroforestry techniques, we\'re not just planting trees',
    retirementDate: 'September 11, 2025',
    verifiedTonnes: 2,
    retirementMessage: '"Last Month Offset"',
    account: '0x74243ffjsfiuhesoifhsoiuueueoic16494664465C...',
    txId: '0x8f4a2b9...',
    certificateNumber: '#34101447',
    blockchainAddress: 'F4HFIR4QLVAULCYGQQVHX...'
  };

  projectDetails: ProjectDetails = {
    country: 'France',
    company: 'Bosques Amazonicos',
    web: 'www.web.com',
    registry: 'Verra Registry',
    validation: 'Dec 27, 2040',
    blockchainAddress: 'F4HFIR4QLVAULCYGQQVHX...',
    type: 'REDD+(Reducing Emissions from Deforestation and forest Degradation)',
    mechanism: 'Avoidance',
    characteristics: 'Biodiversity',
    methodology: 'VM0007 v1.5'
  };

  verificationStatus: VerificationStatus = {
    blockchainVerified: true,
    registryApproved: true,
    permanentlyRetired: true
  };

  projectOverviewExpanded = true;
  projectDetailsExpanded = true;
  showFullDescription = false;

  ngOnInit(): void {
    // Initialize component
  }

    constructor(private fb: FormBuilder, public router: Router) {}

  toggleProjectOverview(): void {
    this.projectOverviewExpanded = !this.projectOverviewExpanded;
  }

  toggleProjectDetails(): void {
    this.projectDetailsExpanded = !this.projectDetailsExpanded;
  }

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  getDescription(): string {
    return this.showFullDescription 
      ? this.certificate.fullDescription 
      : this.certificate.description;
  }

  downloadPDF(): void {
    console.log('Downloading PDF certificate...');
    // Implement PDF download logic
    alert('Downloading Certificate PDF...');
  }

  shareRetirement(): void {
    console.log('Sharing retirement certificate...');
    // Implement share functionality
    alert('Share functionality');
  }

  viewRegistry(): void {
    console.log('Opening registry...');
    window.open('https://registry.verra.org', '_blank');
  }

  goBack(): void {
    // window.history.back();
    this.router.navigate(['/dash']);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }
}























// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-retire-proof',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './retire-proof.component.html',
// //   styleUrl: './retire-proof.component.scss'
// // })
// // export class RetireProofComponent {

// // }
