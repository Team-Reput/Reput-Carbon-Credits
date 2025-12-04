// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-seller-validation',
//   standalone: true,
//   imports: [],
//   templateUrl: './seller-validation.component.html',
//   styleUrl: './seller-validation.component.scss'
// })
// export class SellerValidationComponent {

// }




import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ProjectDetails {
  projectName: string;
  projectType: string;
  countryRegion: string;
  issuancePeriodStart: string;
  issuancePeriodEnd: string;
  pddFile?: File;
  feasibilityFile?: File;
  legalProofFile?: File;
  communicationChannel: string;
  preferredLanguage: string;
  additionalNotes: string;
}

@Component({
  selector: 'app-seller-validation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-validation.component.html',
  styleUrls: ['./seller-validation.component.scss']
})
export class SellerValidationComponent {
  currentStep: number = 1;
  totalSteps: number = 5;
  selectedService: 'self' | 'full' | null = null;
  
  projectDetails: ProjectDetails = {
    projectName: '',
    projectType: '',
    countryRegion: '',
    issuancePeriodStart: '',
    issuancePeriodEnd: '',
    communicationChannel: '',
    preferredLanguage: '',
    additionalNotes: ''
  };

  authorizationChecks = {
    actOnBehalf: false,
    dataAccuracy: false,
    complianceRules: false
  };

  pddFileName: string = '';
  feasibilityFileName: string = '';
  legalProofFileName: string = '';

  constructor(public router: Router) {}

  selectService(service: 'self' | 'full') {
    this.selectedService = service;

    this.nextStep();
  }

  nextStep() {
    if (this.currentStep === 1 && !this.selectedService) {
      alert('Please select a service option');
      return;
    }
    
    if (this.currentStep === 2 && !this.validateProjectDetails()) {
      alert('Please fill in all required project details');
      return;
    }

    if (this.currentStep === 3 && !this.validateAuthorizations()) {
      alert('Please accept all authorization statements');
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateProjectDetails(): boolean {
    return !!(this.projectDetails.projectName && 
              this.projectDetails.projectType && 
              this.projectDetails.countryRegion);
  }

  validateAuthorizations(): boolean {
    return this.authorizationChecks.actOnBehalf && 
           this.authorizationChecks.dataAccuracy && 
           this.authorizationChecks.complianceRules;
  }

  onFileSelect(event: any, fileType: 'pdd' | 'feasibility' | 'legal') {
    const file = event.target.files[0];
    if (file) {
      switch(fileType) {
        case 'pdd':
          this.projectDetails.pddFile = file;
          this.pddFileName = file.name;
          break;
        case 'feasibility':
          this.projectDetails.feasibilityFile = file;
          this.feasibilityFileName = file.name;
          break;
        case 'legal':
          this.projectDetails.legalProofFile = file;
          this.legalProofFileName = file.name;
          break;
      }
    }
  }

  triggerFileInput(inputId: string) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput?.click();
  }

  clearAll() {
    this.projectDetails = {
      projectName: '',
      projectType: '',
      countryRegion: '',
      issuancePeriodStart: '',
      issuancePeriodEnd: '',
      communicationChannel: '',
      preferredLanguage: '',
      additionalNotes: ''
    };
    this.pddFileName = '';
    this.feasibilityFileName = '';
    this.legalProofFileName = '';
  }

  submitOnboarding() {
    console.log('Onboarding submitted:', {
      service: this.selectedService,
      projectDetails: this.projectDetails,
      authorizations: this.authorizationChecks
    });
    this.nextStep();
  }

  goToDashboard() {
    console.log('Navigate to dashboard');
    this.nextStep();
  }

  viewSubmission() {
    console.log('View submission details');
    this.nextStep();
  }

  contactSupport() {
    console.log('Contact support');
  }


  navigateDashboard() { 
      this.router.navigate(['/supplier-dashboard']);
  }
}