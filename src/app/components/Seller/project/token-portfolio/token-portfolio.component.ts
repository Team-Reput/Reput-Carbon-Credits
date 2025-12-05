import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

interface StatCard {
  icon: string;
  label: string;
  value: string;
}

interface ProjectRow {
  projectName: string;
  creditsOwned: string;
  creditsRetired: string;
  lastUpdate: string;
  status: 'Completed' | 'Active' | 'Pending';
  expanded: boolean;
  batches?: BatchRow[];
}

interface BatchRow {
  batchId: string;
  vintageYear: string;
  creditsTokenized: string;
  date: string;
  tokenContract: string;
  status: 'Completed' | 'Active';
}

interface Certificate {
  creditsOwned: string;
  certificateType: string;
  quantity: string;
  issuedDate: string;
}

interface Transaction {
  date: string;
  projectName: string;
  action: string;
  credits: string;
  network: string;
  txHash: string;
  status: 'Active' | 'Pending';
}

interface ComplianceCert {
  date: string;
  linkedProject: string;
  issuedOn: string;
}

@Component({
  selector: 'app-token-portfolio',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './token-portfolio.component.html',
  styleUrls: ['./token-portfolio.component.scss']
})
export class TokenPortfolioComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  pageTitle = 'Tokenization Status & Blockchain Details';
  pageDescription = 'View and manage all your tokenized carbon credit batches, balances, and transaction history across projects.';

  statCards: StatCard[] = [
    { icon: '🌍', label: 'Total Tokenized Credits', value: '31 tCO2e' },
    { icon: '💰', label: 'Current Token Value (Rup.)', value: '$1,8,00,000' },
    { icon: '📊', label: 'Projects Tokenized', value: '30,000 rCC' },
    { icon: '⏳', label: 'Pending Tokenizations', value: '2' },
    { icon: '📅', label: 'Last Updated', value: '13 Oct 2025' }
  ];

  projects: ProjectRow[] = [
    {
      projectName: 'Green Wind Solar Hybrid',
      creditsOwned: '25,000 rCC',
      creditsRetired: '8,000 rCC',
      lastUpdate: '13 Oct 2025',
      status: 'Completed',
      expanded: false,
      batches: [
        {
          batchId: 'B-GW-01',
          vintageYear: '2025',
          creditsTokenized: '15,000 rCC',
          date: '10 Oct 2025',
          tokenContract: '0x7FR2A9...A9E',
          status: 'Completed'
        },
        {
          batchId: 'B-GW-02',
          vintageYear: '2026',
          creditsTokenized: '10,000 rCC',
          date: '13 Oct 2025',
          tokenContract: '0x9C21bE...E7A',
          status: 'Completed'
        }
      ]
    },
    {
      projectName: 'BlueForest Reforestation',
      creditsOwned: '20,000 rCC',
      creditsRetired: '8,000 rCC',
      lastUpdate: '13 Oct 2025',
      status: 'Active',
      expanded: false
    },
    {
      projectName: 'Waste2Energy Kerala',
      creditsOwned: '15,000 rCC',
      creditsRetired: '2,000 rCC',
      lastUpdate: '13 Oct 2025',
      status: 'Pending',
      expanded: false
    }
  ];

  certificates: Certificate[] = [
    {
      creditsOwned: 'Purchase Certificate',
      certificateType: 'GreenWind Solar Hybrid',
      quantity: '5,000 rCC',
      issuedDate: '10 Oct 2025'
    },
    {
      creditsOwned: 'Retirement Certificate',
      certificateType: 'BlueForest Reforestation',
      quantity: '8,000 rCC',
      issuedDate: '12 Oct 2025'
    },
    {
      creditsOwned: 'Tokenization Certificate (for buyer reference)',
      certificateType: 'Waste2Energy Kerala',
      quantity: '2,000 rCC',
      issuedDate: '11 Oct 2025'
    }
  ];

  transactions: Transaction[] = [
    {
      date: '10 Oct 2025',
      projectName: 'GreenWind Solar Hybrid',
      action: 'Mint',
      credits: '13,000',
      network: 'Polygon',
      txHash: '0x9811a2...',
      status: 'Active'
    },
    {
      date: '12 Oct 2025',
      projectName: 'BlueForest Reforestation',
      action: 'Mint',
      credits: '20,000',
      network: 'Ethereum',
      txHash: '0xc7b07d...',
      status: 'Active'
    },
    {
      date: '11 Oct 2025',
      projectName: 'Waste2Energy Kerala',
      action: 'Mint',
      credits: '15,000',
      network: 'Polygon',
      txHash: '0x6fee52a...',
      status: 'Pending'
    }
  ];

  complianceCerts: ComplianceCert[] = [
    {
      date: '10 Oct 2025',
      linkedProject: 'GreenWind Solar Hybrid',
      issuedOn: '13 Oct 2025'
    },
    {
      date: '12 Oct 2025',
      linkedProject: 'BlueForest Reforestation',
      issuedOn: '10 Oct 2025'
    }
  ];

  // Chart configurations
  lineChartOptions: Highcharts.Options = {};
  pieChartOptions: Highcharts.Options = {};
  barChartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Line Chart - Tokenized Credits Over Time
    this.lineChartOptions = {
      chart: {
        type: 'line',
        height: 300
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Credits (k)'
        },
        labels: {
          format: '{value}k'
        }
      },
      series: [{
        type: 'line',
        name: 'Credits',
        data: [4, 15, 8, 6, 18],
        color: '#4ade80',
        marker: {
          symbol: 'circle',
          radius: 5
        }
      }],
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      }
    };

    // Pie Chart - Distribution By Network
    this.pieChartOptions = {
      chart: {
        type: 'pie',
        height: 300
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          innerSize: '0%',
          dataLabels: {
            enabled: true,
            format: '{point.name}<br>{point.percentage:.1f}%'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Network',
        data: [
          { name: 'Polygon', y: 60, color: '#8b5cf6' },
          { name: 'Ethereum', y: 40, color: '#fb7185' }
        ]
      }],
      credits: {
        enabled: false
      }
    };

    // Bar Chart - Credits Per Project
    this.barChartOptions = {
      chart: {
        type: 'column',
        height: 300
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['GreenWind', 'BlueForest', 'Waste2Energy']
      },
      yAxis: {
        title: {
          text: 'Credits'
        },
        labels: {
          format: '{value}'
        }
      },
      series: [{
        type: 'column',
        name: 'Credits',
        data: [25000, 30000, 15000],
        color: '#8b5cf6',
        dataLabels: {
          enabled: true,
          format: '{y}'
        }
      }],
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      }
    };
  }

  toggleProject(project: ProjectRow): void {
    project.expanded = !project.expanded;
  }

  viewBatch(project: string): void {
    console.log('Viewing batch for:', project);
  }

  viewBatchDetail(batch: string): void {
    console.log('Viewing batch detail:', batch);
  }

  downloadCertificate(cert: string): void {
    console.log('Downloading certificate:', cert);
  }

  viewOnChain(cert: string): void {
    console.log('Viewing on chain:', cert);
    window.open('https://polygonscan.com/', '_blank');
  }

  viewTxHash(hash: string): void {
    console.log('Viewing transaction:', hash);
    window.open(`https://polygonscan.com/tx/${hash}`, '_blank');
  }

  downloadCSV(): void {
    console.log('Downloading CSV...');
    const csvContent = 'Date,Project Name,Action,Credits,Network,Tx Hash,Status\n' +
      this.transactions.map(t => 
        `${t.date},${t.projectName},${t.action},${t.credits},${t.network},${t.txHash},${t.status}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  initiateNewTokenization(): void {
    console.log('Initiating new tokenization...');
  }

  viewProjectDetails(): void {
    console.log('Viewing project details...');
  }

  viewBridgeTransactions(): void {
    console.log('Viewing bridge transactions...');
  }

  generatePortfolioReport(): void {
    console.log('Generating portfolio report...');
  }

  downloadComplianceCert(project: string): void {
    console.log('Downloading compliance certificate for:', project);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}