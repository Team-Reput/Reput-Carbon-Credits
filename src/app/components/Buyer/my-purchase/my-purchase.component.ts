
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../common/navbar/navbar.component';

interface Project {
  name: string;
  creditsOwned: number;
  creditsRetired: number;
  network: string;
  status: 'Active' | 'Pending' | 'Partial Retirement';
}

interface Certificate {
  type: string;
  certificateType: string;
  quantity: number;
  issuedDate: string;
  hasChain?: boolean;
}

interface Transaction {
  date: string;
  projectName: string;
  action: 'Purchase' | 'Retirement';
  credits: number;
  network: string;
  txHash: string;
  status: 'Active' | 'Pending';
}

interface OffsetData {
  type: string;
  percentage: number;
  value: number;
}

interface TimelineData {
  month: string;
  value: number;
}


@Component({
  selector: 'app-my-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './my-purchase.component.html',
  styleUrl: './my-purchase.component.scss'
})




export class MyPurchaseComponent implements OnInit {
  // Header stats
  totalPurchased = 31;
  totalRetired = 15000;
  activeBalance = 30000;
  networks = 'Polygon, Ethereum';
  lastUpdated = '13 Oct 2025';

  // Projects data
  projects: Project[] = [
    {
      name: 'GreenWind Solar Hybrid',
      creditsOwned: 10000,
      creditsRetired: 5000,
      network: 'Polygon',
      status: 'Active'
    },
    {
      name: 'BlueForest Reforestation',
      creditsOwned: 20000,
      creditsRetired: 8000,
      network: 'Ethereum',
      status: 'Active'
    },
    {
      name: 'Waste2Energy Kerala',
      creditsOwned: 15000,
      creditsRetired: 2000,
      network: 'Polygon',
      status: 'Partial Retirement'
    }
  ];

  // Certificates data
  certificates: Certificate[] = [
    {
      type: 'Purchase Certificate',
      certificateType: 'GreenWind Solar Hybrid',
      quantity: 5000,
      issuedDate: '10 Oct 2025'
    },
    {
      type: 'Retirement Certificate',
      certificateType: 'BlueForest Reforestation',
      quantity: 8000,
      issuedDate: '12 Oct 2025'
    },
    {
      type: 'Tokenization Certificate (for buyer reference)',
      certificateType: 'Waste2Energy Kerala',
      quantity: 2000,
      issuedDate: '11 Oct 2025',
      hasChain: true
    }
  ];

  // Transaction history
  transactions: Transaction[] = [
    {
      date: '10 Oct 2025',
      projectName: 'GreenWind Solar Hybrid',
      action: 'Purchase',
      credits: 10000,
      network: 'Polygon',
      txHash: '0xa87fb2...',
      status: 'Active'
    },
    {
      date: '12 Oct 2025',
      projectName: 'BlueForest Reforestation',
      action: 'Retirement',
      credits: 20000,
      network: 'Ethereum',
      txHash: '0ac7fc01d...',
      status: 'Active'
    },
    {
      date: '11 Oct 2025',
      projectName: 'Waste2Energy Kerala',
      action: 'Purchase',
      credits: 15000,
      network: 'Polygon',
      txHash: '0x89ec62a...',
      status: 'Pending'
    }
  ];

  // Offset data for pie chart
  offsetData: OffsetData[] = [
    { type: 'Renewable Energy', percentage: 53.00, value: 16 },
    { type: 'Forestry', percentage: 33.00, value: 10 },
    { type: 'Waste Management', percentage: 13.00, value: 4 }
  ];

  // Timeline data
  timelineData: TimelineData[] = [
    { month: 'Jul', value: 2 },
    { month: 'Aug', value: 8 },
    { month: 'Sep', value: 5 },
    { month: 'Oct', value: 4 },
    { month: 'Nov', value: 7 },
    { month: 'Dec', value: 9 }
  ];

  // Filters
  selectedProjectFilter = 'All Projects';
  selectedTypeFilter = 'All Type';
  
  filteredProjects: Project[] = [];
  filteredTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    // Filter projects
    this.filteredProjects = this.projects.filter(project => {
      if (this.selectedProjectFilter !== 'All Projects' && 
          project.name !== this.selectedProjectFilter) {
        return false;
      }
      return true;
    });

    // Filter transactions
    this.filteredTransactions = this.transactions.filter(transaction => {
      const projectMatch = this.selectedProjectFilter === 'All Projects' || 
                          transaction.projectName === this.selectedProjectFilter;
      const typeMatch = this.selectedTypeFilter === 'All Type' || 
                       transaction.action === this.selectedTypeFilter;
      return projectMatch && typeMatch;
    });
  }

  onProjectFilterChange(): void {
    this.applyFilters();
  }

  onTypeFilterChange(): void {
    this.applyFilters();
  }

  downloadCSV(): void {
    const csv = this.generateCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-credits-transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  generateCSV(): string {
    const headers = ['Date', 'Project Name', 'Action', 'Credits', 'Network', 'Tx Hash', 'Status'];
    const rows = this.filteredTransactions.map(t => 
      [t.date, t.projectName, t.action, t.credits, t.network, t.txHash, t.status].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  downloadPDF(certificate: Certificate): void {
    alert(`Downloading PDF for ${certificate.certificateType}`);
  }

  viewOnChain(certificate: Certificate): void {
    alert(`Viewing on-chain data for ${certificate.certificateType}`);
  }

  viewDetails(project: Project): void {
    alert(`Viewing details for ${project.name}`);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  getProjectOptions(): string[] {
    return ['All Projects', ...this.projects.map(p => p.name)];
  }

  getTypeOptions(): string[] {
    return ['All Type', 'Purchase', 'Retirement'];
  }

  // SVG path calculation for pie chart
  getPieSlicePath(startAngle: number, endAngle: number, radius: number = 90): string {
    const start = this.polarToCartesian(100, 100, radius, endAngle);
    const end = this.polarToCartesian(100, 100, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M 100 100 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  }

  polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  getAccumulatedAngle(index: number): number {
    return this.offsetData
      .slice(0, index)
      .reduce((sum, item) => sum + (item.percentage / 100 * 360), 0);
  }

  getSliceAngle(percentage: number): number {
    return percentage / 100 * 360;
  }

  // Timeline chart calculations
  getTimelinePoints(): string {
    const width = 250;
    const height = 100;
    const padding = 10;
    const max = Math.max(...this.timelineData.map(d => d.value));
    
    return this.timelineData.map((d, i) => {
      const x = padding + (i * (width - 2 * padding) / (this.timelineData.length - 1));
      const y = height - padding - ((d.value / max) * (height - 2 * padding));
      return `${x},${y}`;
    }).join(' ');
  }

  getTimelineCircles(): Array<{x: number, y: number}> {
    const width = 250;
    const height = 100;
    const padding = 10;
    const max = Math.max(...this.timelineData.map(d => d.value));
    
    return this.timelineData.map((d, i) => {
      const x = padding + (i * (width - 2 * padding) / (this.timelineData.length - 1));
      const y = height - padding - ((d.value / max) * (height - 2 * padding));
      return { x, y };
    });
  }
}