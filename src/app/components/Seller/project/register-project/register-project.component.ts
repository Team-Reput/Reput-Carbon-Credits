import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router'; 

interface ProjectType {
  id: string;
  name: string;
}

interface ProjectCategory {
  id: string;
  name: string;
}

interface Country {
  id: string;
  name: string;
}

interface DocumentUpload {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  file: File | null;
}

@Component({
  selector: 'app-register-project',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.scss']
})
export class RegisterProjectComponent {
  // Sidebar state
  isSidebarExpanded = false;
  
  constructor(public router: Router) {}

  // User info
  userInfo = {
    name: 'ARETL Pvt Ltd',
    avatar: 'https://ui-avatars.com/api/?name=ARETL+Pvt+Ltd&background=10b981&color=fff'
  };

  // Form data
  projectData = {
    projectName: '',
    projectType: '',
    projectCategory: '',
    countryRegion: '',
    coordinates: '',
    estimatedStartDate: '',
    expectedEmissionReductions: '',
    shortDescription: '',
    serviceModel: 'guidance',
    hasManufacturing: 'yes',
    higgFacilityId: '',
    facilityName: '',
    facilityCountry: '',
    assessmentYear: '',
    useDefaultWallet: true,
    additionalNotes: '',
    confirmAccuracy: false,
    understandRePa: false,
    agreeReview: false
  };

  // Dropdown options
  projectTypes: ProjectType[] = [
    { id: '1', name: 'Renewable Energy' },
    { id: '2', name: 'Energy Efficiency' },
    { id: '3', name: 'Forestry and Land Use' },
    { id: '4', name: 'Waste Management' },
    { id: '5', name: 'Agriculture' }
  ];

  projectCategories: ProjectCategory[] = [
    { id: '1', name: 'Solar Energy' },
    { id: '2', name: 'Wind Energy' },
    { id: '3', name: 'Hydroelectric' },
    { id: '4', name: 'Biomass' },
    { id: '5', name: 'Carbon Capture' }
  ];

  countries: Country[] = [
    { id: '1', name: 'United States' },
    { id: '2', name: 'India' },
    { id: '3', name: 'China' },
    { id: '4', name: 'Germany' },
    { id: '5', name: 'United Kingdom' },
    { id: '6', name: 'Brazil' },
    { id: '7', name: 'Australia' }
  ];

  // Document uploads
  documentUploads: DocumentUpload[] = [
    { id: '1', label: 'Project Design Document (PDD)', placeholder: 'Click Here!!', required: true, file: null },
    { id: '2', label: 'Validation Report', placeholder: 'Click file!!', required: false, file: null },
    { id: '3', label: 'Verification Report', placeholder: 'Click file!!', required: false, file: null },
    { id: '4', label: 'Ownership / Legal Documents', placeholder: 'Click Or Drop file, ppt,img and Etc.', required: false, file: null },
    { id: '5', label: 'Monitoring Report', placeholder: 'Click file', required: false, file: null }
  ];

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  onFileSelect(event: Event, documentId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const doc = this.documentUploads.find(d => d.id === documentId);
      if (doc) {
        doc.file = input.files[0];
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent, documentId: string): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const doc = this.documentUploads.find(d => d.id === documentId);
      if (doc) {
        doc.file = event.dataTransfer.files[0];
      }
    }
  }

  removeFile(documentId: string): void {
    const doc = this.documentUploads.find(d => d.id === documentId);
    if (doc) {
      doc.file = null;
    }
  }

  saveAsDraft(): void {
    console.log('Saving as draft...', this.projectData);
    // Implement save as draft logic
  }

  reviewAndSubmit(): void {
    console.log('Reviewing and submitting...', this.projectData);
    // Implement review and submit logic
  }

  navigateToDashboard(): void {
    console.log('Navigating to dashboard...');
    this.router.navigate(['/supplier-dashboard']);
    // Implement navigation logic
  }
}