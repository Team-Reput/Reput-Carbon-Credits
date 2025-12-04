import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
   selectedRole: string = ''; // default
   onGoingStep:string = 'step1';

  constructor(private router: Router,private fb: FormBuilder) {
    this.kycForm = this.fb.group({
      entityName: [''],
      country: [''],
      fullName: [''],
      role: [''],
      email: [''],
      phone: ['']
    });
  }

  selectRole(role: string) {
    this.selectedRole = role; 
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  startOnboarding() {
    // if (this.selectedRole === 'buyer') {
    //   this.router.navigate(['/buyer-onboarding']);
    // } else {
    //   this.router.navigate(['/seller-onboarding']);
    // }

     if (this.selectedRole === 'seller') {
      this.router.navigate(['/seller-onboarding']);
    }

    if(this.onGoingStep==='step1'){
      this.onGoingStep = 'step2'
    }else if(this.onGoingStep === 'step2'){
      this.onGoingStep = 'step3'
    }
  }

  features = [
    {
      icon: 'fa-solid fa-shield-halved',
      text: 'Secure Transaction Protection'
    },
    {
      icon: 'fa-regular fa-id-card',
      text: 'Identity Verification (KYC/AML Compliance)'
    }
  ];

    skipOnboarding() {
    console.log('User skipped onboarding');
    this.router.navigate(['/dashboard']);
  }

  startOnboarding2() {
    console.log('User started onboarding');
    // this.router.navigate(['/onboarding-process']);
        if(this.onGoingStep==='step1'){
      this.onGoingStep = 'step2'
    }else if(this.onGoingStep === 'step2'){
      this.onGoingStep = 'step3'
    }
  }











  steps = ['Basic Details', 'Document Upload', 'Authorized Contact'];
  currentStep = 0;

  orgTypes = [
    { label: 'Corporate', icon: 'business' },
    { label: 'SME', icon: 'apartment' },
    { label: 'Individual', icon: 'person' },
  ];

  countries = ['India', 'USA', 'UK', 'Germany', 'Canada'];

  selectedOrgType: string = '';
  uploadedFiles: any = {};

  documentFields = [
    { key: 'idProof', label: 'Incorporation Certificate / ID Proof' },
    { key: 'taxCertificate', label: 'Tax ID / VAT Certificate' },
    { key: 'signatoryId', label: 'Authorized Signatory ID' }
  ];

  kycForm !: FormGroup;

  selectOrgType(type: any) {
    this.selectedOrgType = type.label;
  }

  onFileClick(doc: any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.png';
    input.onchange = (e: any) => this.onFileSelect(e, doc);
    input.click();
  }

  onFileSelect(event: any, doc: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFiles[doc.key] = file;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      console.log('Form Data:', this.kycForm.value);
      console.log('Uploaded Files:', this.uploadedFiles);
      alert('KYC Form Submitted ✅');
      this.router.navigate(['/dash']);
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

}
