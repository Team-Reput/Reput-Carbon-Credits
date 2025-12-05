import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface TokenizationOverview {
  projectName: string;
  registryName: string;
  registryProjectId: string;
  totalCreditsIssued: string;
  creditsRequestedForTokenization: string;
  dateOfRequest: string;
  tokenizationType: string;
  processingPartner: string;
}

interface TransactionStep {
  stepNumber: number;
  title: string;
  description: string;
  status: 'Complete' | 'In Progress' | 'Pending';
}

interface BlockchainDetails {
  blockchainNetwork: string;
  tokenContractAddress: string;
  totalCreditsIssued: string;
  mintedTokens: string;
  bridgeReference: string;
  tokenization: string;
  tokenMintDate: string;
  walletReceivingTokens: string;
}

interface TokenBatchInfo {
  batchId: string;
  vintageYear: string;
  tokenCount: string;
  methodology: string;
  registryReference: string;
  issuer: string;
  tokenization: string;
  tokenMintDate: string;
  certType: string;
  retirementStatus: string;
}

interface AuditLogEntry {
  date: string;
  action: string;
  performedBy: string;
  details: string;
}

interface Comment {
  message: string;
  timestamp: Date;
}



interface ProjectData {
  projectId: string;
  projectName: string;
  vintageYear: string;
  registryName: string;
  registryProjectId: string;
  methodology: string;
  carbonType: string;
}

interface TokenizationData {
  totalCreditsIssued: string;
  mintedTokens: string;
  tokenSymbol: string;
  tokenMintDate: string;
  blockchainNetwork: string;
  bridgeReferenceId: string;
  retirementStatus: 'Active' | 'Inactive';
}

interface IssuanceCustodyData {
  tokenContractAddress: string;
  walletReceivingTokens: string;
  issuer: string;
}


@Component({
  selector: 'app-token-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './token-status.component.html',
  styleUrls: ['./token-status.component.scss']
})
export class TokenStatusComponent implements OnInit {
  pageTitle = 'Tokenization Status & Blockchain Details';
  // projectInfo = 'Project: GreenWind Solar Hybrid Project • Tokenization Request ID: TNZ-2025-0043 • Submitted: 15 Oct 2025';
  successMessage = 'Tokenization completed successfully. All Tokens have been minted and transferred to your registered wallet.';


  constructor(public router: Router) { }

  tokenizationOverview: TokenizationOverview = {
    projectName: 'GreenWind Solar Hybrid Project',
    registryName: 'Verra',
    registryProjectId: 'VCS-11876',
    totalCreditsIssued: '25,000 VCUs',
    creditsRequestedForTokenization: '25,000 VCUs',
    dateOfRequest: '15 Oct 2025',
    tokenizationType: 'Full Batch (1:1)',
    processingPartner: 'ReFut Bridge – Custody Verified'
  };

  transactionSteps: TransactionStep[] = [
    {
      stepNumber: 1,
      title: 'Request Submitted',
      description: 'Tokenization request submitted to bridge.',
      status: 'Complete'
    },
    {
      stepNumber: 2,
      title: 'Custody Confirmation',
      description: 'Credits on-hold and sent to issuer\'s custody wallet.',
      status: 'Complete'
    },
    {
      stepNumber: 3,
      title: 'Token Minting',
      description: 'Smart contract on Blockchain corresponding to rCC minted.',
      status: 'Complete'
    },
    {
      stepNumber: 4,
      title: 'Transfer to Wallet',
      description: 'Tokens transferred to developer\'s wallet.',
      status: 'Complete'
    }
  ];

  blockchainDetails: BlockchainDetails = {
    blockchainNetwork: 'Polygon',
    tokenContractAddress: '0x7FR2A903A616F46bA9E',
    totalCreditsIssued: '25,000 VCUs',
    mintedTokens: '25,000 rCC',
    bridgeReference: 'BRG-TNZ-2025-0043',
    tokenization: 'Full Batch (1:1)',
    tokenMintDate: '16 Oct 2025',
    walletReceivingTokens: '0x4F2aB7C391E58F12b07E19C7aD4'
  };

  tokenBatchInfo: TokenBatchInfo = {
    batchId: 'REP-FJ-2025-012',
    vintageYear: '2025',
    tokenCount: '25,000',
    methodology: 'ACM0002 (Renewable Energy Projects)',
    registryReference: 'VCS-11876',
    issuer: 'ReFut Bridge (on behalf of GreenWind Developer)',
    tokenization: 'Full Batch (1:1)',
    tokenMintDate: '16 Oct 2025',
    certType: 'Verified Carbon Unit (VCU)',
    retirementStatus: 'active'
  };

  auditLog: AuditLogEntry[] = [
    {
      date: '15 Oct 2025',
      action: 'Tokenization request created',
      performedBy: 'Developer',
      details: 'Requested 25,000 credits'
    },
    {
      date: '15 Oct 2025',
      action: 'Custody verified',
      performedBy: 'ReFut Bridge',
      details: 'Credits received from registry'
    },
    {
      date: '16 Oct 2025',
      action: 'Tokens minted',
      performedBy: 'ReFut Bridge',
      details: 'Minted 25,000 rCC'
    },
    {
      date: '16 Oct 2025',
      action: 'Tokens transferred',
      performedBy: 'Bridge Smart Contract',
      details: 'Sent to 0x4F2aB7C...19C7aD4'
    }
  ];

  comments: Comment[] = [
    {
      message: 'Tokenization completed successfully on Polygon network.',
      timestamp: new Date('2025-10-16')
    }
  ];

  newComment: string = '';

  ngOnInit(): void {
    // Initialize component
  }

  downloadProjectSummary(): void {
    console.log('Downloading project summary PDF...');
    // Implement PDF download
  }

  downloadCertificate(): void {
    console.log('Downloading certificate...');
    // Implement certificate download
  }

  viewOnChain(): void {
    console.log('Opening blockchain explorer...');
    window.open(`https://polygonscan.com/address/${this.blockchainDetails.tokenContractAddress}`, '_blank');
  }

  initiateNewTokenization(): void {
    console.log('Initiating new tokenization...');
    // Navigate to tokenization form
  }

  viewOnPolygonScan(): void {
    console.log('Opening PolygonScan...');
    window.open(`https://polygonscan.com/address/${this.blockchainDetails.tokenContractAddress}`, '_blank');
  }

  downloadTokenizationCertificate(): void {
    console.log('Downloading tokenization certificate...');
    // Implement certificate download
  }

  viewInWallet(): void {
    console.log('Opening wallet view...');
    window.open(`https://polygonscan.com/address/${this.blockchainDetails.walletReceivingTokens}`, '_blank');
  }

  downloadCSV(): void {
    console.log('Downloading audit log CSV...');
    
    // Convert audit log to CSV
    const headers = ['Date', 'Action', 'Performed By', 'Details'];
    const csvContent = [
      headers.join(','),
      ...this.auditLog.map(entry => 
        [entry.date, entry.action, entry.performedBy, entry.details].join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-log.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  sendMessage(): void {
    if (this.newComment.trim()) {
      this.comments.push({
        message: this.newComment,
        timestamp: new Date()
      });
      this.newComment = '';
      console.log('Message sent to RePut team');
    }
  }

  contactSupport(): void {
    console.log('Opening support contact...');
    // Open support form or email
  }

  getStepStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
      // You can add a toast notification here
    });
  }








   projectInfo: ProjectData = {
    projectId: 'REP-PJ-2025-012',
    projectName: 'GreenWind Solar Hybrid Project',
    vintageYear: '2025',
    registryName: 'Verra',
    registryProjectId: 'VCS-11876',
    methodology: 'ACM0002 (Renewable Energy Projects)',
    carbonType: 'Verified Carbon Unit (VCU)'
  };

  tokenizationDetails: TokenizationData = {
    totalCreditsIssued: '25,000 VCUs',
    mintedTokens: '25,000 rCC',
    tokenSymbol: 'rCC (RePut Carbon Credit)',
    tokenMintDate: '16 Oct 2025',
    blockchainNetwork: 'Polygon',
    bridgeReferenceId: 'BRG-TNZ-2025-0043',
    retirementStatus: 'Active'
  };

  issuanceCustody: IssuanceCustodyData = {
    tokenContractAddress: '0x7Fb2A9D3A61bF46bA9E',
    walletReceivingTokens: '0x4F2aB7C391E58F12bD7E19C7aD4',
    issuer: 'RePut Bridge (on behalf of GreenWind Developer)'
  };

  viewTokenDetails() {
    console.log('Viewing token details...');
    // Navigate to token details page or open modal
    this.router.navigate(['/project/token-details']);
  }

  // viewOnPolygonScan() {
  //   console.log('Opening PolygonScan...');
  //   // Open PolygonScan in new tab
  //   window.open(`https://polygonscan.com/address/${this.issuanceCustody.walletReceivingTokens}`, '_blank');
  // }

  getRetirementStatusClass(): string {
    return this.tokenizationDetails.retirementStatus === 'Active' 
      ? 'status-active' 
      : 'status-inactive';
  }
}