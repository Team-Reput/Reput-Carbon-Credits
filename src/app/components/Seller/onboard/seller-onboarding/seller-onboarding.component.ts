import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface OnboardingData {
  // Step 1 - Organization Information
  organizationType: string;
  legalEntityName: string;
  countryOfRegistration: string;
  authorizedRepName: string;
  authorizedRepEmail: string;

  // Step 2 - Document Upload
  certificateFile: File | null;
  taxIdFile: File | null;
  signatoryIdFile: File | null;

  // Step 3 - Contact Information (added in review)
  fullName: string;
  designation: string;
  email: string;
  phoneNumber: string;

  // Step 4 - Blockchain Wallet
  blockchainNetwork: string;
  walletAddress: string;
  confirmWalletAddress: string;
  walletNickname: string;

  // Step 5 - Acknowledgment
  accuracyConfirmed: boolean;
  reviewConfirmed: boolean;
  policiesAcknowledged: boolean;
}

@Component({
  selector: 'app-seller-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './seller-onboarding.component.html',
  styleUrls: ['./seller-onboarding.component.scss']
})
export class SellerOnboardingComponent {
   
  currentStep = 0;  
  totalSteps = 5;

  // Form data
  formData: OnboardingData = {
    organizationType: '',
    legalEntityName: '',
    countryOfRegistration: '',
    authorizedRepName: '',
    authorizedRepEmail: '',
    certificateFile: null,
    taxIdFile: null,
    signatoryIdFile: null,
    fullName: '',
    designation: '',
    email: '',
    phoneNumber: '',
    blockchainNetwork: '',
    walletAddress: '',
    confirmWalletAddress: '',
    walletNickname: '',
    accuracyConfirmed: false,
    reviewConfirmed: false,
    policiesAcknowledged: false
  };

  // Dropdowns data
  organizationTypes = [
    'Corporation',
    'LLC',
    'Partnership',
    'Non-Profit',
    'Government Entity',
    'Other'
  ];

  countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'India',
    'China',
    'Japan',
    'Brazil'
  ];

  blockchainNetworks = [
    'Ethereum Mainnet',
    'Polygon',
    'Binance Smart Chain',
    'Avalanche',
    'Solana',
    'Cardano'
  ];

  // File upload states
  certificateDragOver = false;
  taxIdDragOver = false;
  signatoryIdDragOver = false;



    contactForm: FormGroup;
  countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' }
  ];

  // constructor(private router: Router) {}

  
  constructor(private fb: FormBuilder,private router: Router) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  // Navigation methods
  startOnboarding() {
    this.currentStep = 1;
  }

  onClearAll() {
    this.contactForm.reset({
      countryCode: '+91'
    });
  }

  skipOnboarding() {
    // Handle skip logic
    console.log('Onboarding skipped');
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
  }

 

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }


  selectType() {
     this.router.navigate(['/onboarding']);
  }

  clearAll() {
    if (this.currentStep === 1) {
      this.formData.organizationType = '';
      this.formData.legalEntityName = '';
      this.formData.countryOfRegistration = '';
      this.formData.authorizedRepName = '';
      this.formData.authorizedRepEmail = '';
    } else if (this.currentStep === 2) {
      this.formData.certificateFile = null;
      this.formData.taxIdFile = null;
      this.formData.signatoryIdFile = null;
    } else if (this.currentStep === 4) {
      this.formData.blockchainNetwork = '';
      this.formData.walletAddress = '';
      this.formData.confirmWalletAddress = '';
      this.formData.walletNickname = '';
    }
  }

  skipForNow() {
    this.nextStep();
  }

  // File upload methods
  onDragOver(event: DragEvent, type: string) {
    event.preventDefault();
    if (type === 'certificate') this.certificateDragOver = true;
    if (type === 'taxId') this.taxIdDragOver = true;
    if (type === 'signatory') this.signatoryIdDragOver = true;
  }

  onDragLeave(type: string) {
    if (type === 'certificate') this.certificateDragOver = false;
    if (type === 'taxId') this.taxIdDragOver = false;
    if (type === 'signatory') this.signatoryIdDragOver = false;
  }

  onDrop(event: DragEvent, type: string) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0], type);
    }
    this.onDragLeave(type);
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0], type);
    }
  }

  handleFile(file: File, type: string) {
    if (type === 'certificate') {
      this.formData.certificateFile = file;
    } else if (type === 'taxId') {
      this.formData.taxIdFile = file;
    } else if (type === 'signatory') {
      this.formData.signatoryIdFile = file;
    }
  }

  getFileName(type: string): string {
    if (type === 'certificate' && this.formData.certificateFile) {
      return this.formData.certificateFile.name;
    } else if (type === 'taxId' && this.formData.taxIdFile) {
      return this.formData.taxIdFile.name;
    } else if (type === 'signatory' && this.formData.signatoryIdFile) {
      return this.formData.signatoryIdFile.name;
    }
    return '';
  }

  removeFile(type: string) {
    if (type === 'certificate') {
      this.formData.certificateFile = null;
    } else if (type === 'taxId') {
      this.formData.taxIdFile = null;
    } else if (type === 'signatory') {
      this.formData.signatoryIdFile = null;
    }
  }

  // Validation
  validateCurrentStep(): boolean {
    if (this.currentStep === 1) {
      return !!(
        this.formData.organizationType &&
        this.formData.legalEntityName &&
        this.formData.countryOfRegistration &&
        this.formData.authorizedRepName &&
        this.formData.authorizedRepEmail
      );
    } else if (this.currentStep === 2) {
      return !!(
        this.formData.certificateFile &&
        this.formData.taxIdFile &&
        this.formData.signatoryIdFile
      );
    } else if (this.currentStep === 4) {
      return !!(
        this.formData.blockchainNetwork &&
        this.formData.walletAddress &&
        this.formData.confirmWalletAddress &&
        this.formData.walletAddress === this.formData.confirmWalletAddress
      );
    } else if (this.currentStep === 5) {
      return !!(
        this.formData.accuracyConfirmed &&
        this.formData.reviewConfirmed &&
        this.formData.policiesAcknowledged
      );
    }
    return true;
  }

  // Edit section in review
  editSection(section: string) {
    if (section === 'organization') {
      this.currentStep = 1;
    } else if (section === 'documents') {
      this.currentStep = 2;
    } else if (section === 'contact') {
      // Stay on same page, just enable editing
      console.log('Edit contact info');
    } else if (section === 'wallet') {
      this.currentStep = 4;
    }
  }

  // Final submission
  submitVerification() {
    if (this.validateCurrentStep()) {
      console.log('Submitting verification:', this.formData);
      // Handle submission logic here
      alert('Verification submitted successfully!');
      // Optionally redirect to dashboard
      // this.router.navigate(['/dashboard']);
    }
  }

  // Helper method to get step title
  getStepTitle(): string {
    const titles = [
      'Welcome',
      'Basic Details',
      'Document Upload',
      'Contact Information',
      'Blockchain Wallet Setup',
      'Review & Consent'
    ];
    return titles[this.currentStep];
  }

  // Helper method to get step subtitle
  getStepSubtitle(): string {
    const subtitles = [
      '',
      'Step 1 of 5: Basic Details',
      'Step 2 of 5: Document Upload',
      'Step 3 of 5: Contact Information',
      'Step 4 of 5: Blockchain Wallet Setup',
      'Step 5 of 5: Review & Consent'
    ];
    return subtitles[this.currentStep];
  }
}