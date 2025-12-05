import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ProjectData {
  id: string;
  title: string;
  submittedDate: string;
  status: string;
  projectType: string;
  category: string;
  country: string;
  creditsIssued: string;
  requestDate: string;
  serviceType: string;
  assignedManager: string;
  managerEmail: string;
  progress: number;
  registryName: string;
  registryProjectId: string;
  submissionDate: string;
  blockchainNetwork: string;
  tokenContract: string;
  walletAddress: string;
}

interface ProgressStep {
  name: string;
  description: string;
  status: 'Complete' | 'In Progress' | 'Pending';
  date?: string;
}

interface Document {
  id: string;
  name: string;
  filename: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'Approved' | 'Submitted' | 'Pending';
}

interface Communication {
  message: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.scss']
})
export class AboutProjectComponent implements OnInit {

  constructor(private router: Router) {}

  projectData: ProjectData = {
    id: 'REP-FU-2025-012',
    title: 'GreenWind Solar Hybrid Project',
    submittedDate: '13 Oct 2025',
    status: 'Under RePut Review',
    projectType: 'Renewable Energy',
    category: 'Avoidance',
    country: 'India',
    creditsIssued: '25,000 tCO₂e/year',
    requestDate: '01 Dec 2025',
    serviceType: 'Full-Service',
    assignedManager: 'John Peterson',
    managerEmail: 'john@reput.ai',
    progress: 20,
    registryName: 'Verra',
    registryProjectId: 'VCS-11876',
    submissionDate: '13 Oct 2025',
    blockchainNetwork: 'Polygon',
    tokenContract: '0x7FR2A9D3...f46bA9E',
    walletAddress: '0x4F2aB7C...19C7aD4'
  };

  progressSteps: ProgressStep[] = [
    {
      name: 'Registration',
      description: 'Submission to Registry Finalized\nCompleted on 13 Oct 2025',
      status: 'Complete',
      date: '13 Oct 2025'
    },
    {
      name: 'Validation',
      description: 'VVB audit for VVB integrity.\nVerification of VCS 4.5+ Validation Report uploaded and approved',
      status: 'In Progress'
    },
    {
      name: 'Verification',
      description: 'Verification of emissions reductions by VVB',
      status: 'Pending'
    },
    {
      name: 'Issuance',
      description: 'Credits issued by registry',
      status: 'Pending'
    },
    {
      name: 'Tokenization (Optional)',
      description: 'Credits converted into digital tokens via ReFiNet bridge',
      status: 'Pending'
    }
  ];

  documents: Document[] = [
    {
      id: '1',
      name: 'Project Design Document',
      filename: 'GreenWind_PDD.pdf',
      uploadedBy: 'Developer',
      uploadDate: '10 Oct 2025',
      status: 'Approved'
    },
    {
      id: '2',
      name: 'Validation Report',
      filename: 'REP-RegistryForm.pdf',
      uploadedBy: 'Developer',
      uploadDate: '10 Oct 2025',
      status: 'Approved'
    },
    {
      id: '3',
      name: 'Project Design Document',
      filename: 'REP-RegistryForm.pdf',
      uploadedBy: 'Developer',
      uploadDate: '10 Oct 2025',
      status: 'Approved'
    },
    {
      id: '4',
      name: 'Project Design Document',
      filename: 'REP-RegistryForm.pdf',
      uploadedBy: 'Developer',
      uploadDate: '10 Oct 2025',
      status: 'Submitted'
    }
  ];

  communications: Communication[] = [
    {
      message: 'Project submitted for review',
      author: 'Developer',
      date: '13 Oct 2025'
    },
    {
      message: 'Validation initiated',
      author: 'Verra Teams',
      date: '14 Oct 2025'
    },
    {
      message: 'Verification report received',
      author: 'VVB',
      date: '20 Oct 2025'
    }
  ];

  ngOnInit(): void {
    // Initialize any data or make API calls here
  }

  downloadPDF(): void {
    console.log('Downloading project summary PDF...');
    // Implement PDF download logic
  }

  requestTokenDetails(): void {
    console.log('Viewing token details...');
    // Navigate to token details page

    this.router.navigate(['/project/token-request']);
  }

  viewTokenDetails(): void {
    console.log('Viewing token details...');
    // Navigate to token details page

    this.router.navigate(['/project/token-details']);
  }

  editSubmission(): void {
    console.log('Editing submission...');
    // Navigate to edit page
  }

  uploadFiles(): void {
    console.log('Uploading additional files...');
    // Open file upload dialog
  }

  contactRePutTeam(): void {
    console.log('Contacting RePut team...');
    // Open contact form or email client
  }

  viewRegistryRecord(): void {
    console.log('Viewing registry record...');
    // Open registry record in new tab
  }

  viewDocument(doc: Document): void {
    console.log('Viewing document:', doc.name);
    // Open document viewer
  }

  viewOnPolygon(): void {
    console.log('Opening Polygon portal...');
    window.open('https://polygonscan.com/', '_blank');
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  getProgressStepClass(status: string): string {
    switch (status) {
      case 'Complete':
        return 'complete';
      case 'In Progress':
        return 'in-progress';
      default:
        return 'pending';
    }
  }
}