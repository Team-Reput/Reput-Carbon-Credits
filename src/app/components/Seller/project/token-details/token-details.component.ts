import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

interface TokenLifecycleStep {
  step: number;
  title: string;
  description: string;
  date: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}

interface SalesLogEntry {
  date: string;
  event: 'Completed' | 'Retired';
  description: string;
  quantity: number;
  buyerEntity: string;
  certificateLink: string;
}

@Component({
  selector: 'app-token-details',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.scss']
})
export class TokenDetailsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  batchDetails = {
    batchId: 'TKN-VER-2025-0012',
    registryReferenceId: 'VERRA-1458-2025',
    verificationStandard: 'Gold Standard',
    totalTokensMinted: 5000,
    mintDate: 'Oct 23, 2025',
    projectName: 'GreenWind Solar Hybrid Project',
    registryName: 'Verra',
    blockchainNetwork: 'Polygon',
    currentTokenStatus: '4,000 Available, 800 Sold, 200 Retired'
  };

  lifecycleSteps: TokenLifecycleStep[] = [
    {
      step: 1,
      title: 'Token Minted',
      description: 'Created on blockchain by Raffy Bridge',
      date: '07 Oct 2025',
      status: 'In Progress'
    },
    {
      step: 2,
      title: 'Transferred to Developer Wallet',
      description: 'Sent to project developer',
      date: '07 Oct 2025',
      status: 'Completed'
    },
    {
      step: 3,
      title: 'Listed on Marketplace',
      description: 'Available for buyers to purchase',
      date: '07 Oct 2025',
      status: 'In Progress'
    },
    {
      step: 4,
      title: 'Sold / Retired',
      description: 'Tokens bought or retired by buyers',
      date: '16 Oct 2025, 2:45 PM',
      status: 'Pending'
    }
  ];

  blockchainRecords = {
    transferTransactionId: '0xdef...234yzabc',
    smartContractAddress: '0x789j...456ghl',
    custodyType: 'On-chain Wallet',
    bridgeReferenceId: 'N/A (Native Polygon Token)'
  };

  salesLog: SalesLogEntry[] = [
    {
      date: '15 Oct 2025',
      event: 'Completed',
      description: 'Sold to corporate buyer',
      quantity: 2000,
      buyerEntity: 'GreenFuture Corp.',
      certificateLink: 'VIEW-2023-001'
    },
    {
      date: '15 Oct 2025',
      event: 'Completed',
      description: 'Retail sale via marketplace',
      quantity: 500,
      buyerEntity: 'Individual Investor A',
      certificateLink: 'VIEW-2023-002'
    },
    {
      date: '16 Oct 2025',
      event: 'Retired',
      description: 'Retired for annual carbon offset',
      quantity: 1000,
      buyerEntity: 'GreenFuture Corp.',
      certificateLink: 'RET-2023-001'
    },
    {
      date: '16 Oct 2025',
      event: 'Completed',
      description: 'Sold to a sustainability fund',
      quantity: 3000,
      buyerEntity: 'EcoInvest Fund',
      certificateLink: 'VIEW-2023-003'
    }
  ];

  tokenDistribution = {
    available: 4000,
    sold: 800,
    retired: 200
  };

  ngOnInit() {
    this.initializeChart();
  }

  initializeChart() {
    const total = this.tokenDistribution.available + this.tokenDistribution.sold + this.tokenDistribution.retired;
    
    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 300,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> ({point.percentage:.1f}%)'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        itemStyle: {
          fontSize: '12px',
          fontWeight: 'normal'
        }
      },
      series: [{
        type: 'pie',
        name: 'Tokens',
        data: [
          {
            name: 'Available',
            y: this.tokenDistribution.available,
            color: '#8B5CF6'
          },
          {
            name: 'Sold',
            y: this.tokenDistribution.sold,
            color: '#F87171'
          },
          {
            name: 'Retired',
            y: this.tokenDistribution.retired,
            color: '#60A5FA'
          }
        ]
      }]
    };
  }

  downloadTokenizationReport() {
    console.log('Downloading Tokenization Report...');
    // Implement PDF download logic
  }

  downloadBlockchainProof() {
    console.log('Downloading Blockchain Proof...');
    // Implement JSON download logic
  }

  viewRetirementCertificates() {
    console.log('Viewing Retirement Certificates...');
    // Navigate to certificates page
  }

  listMoreTokens() {
    console.log('Listing More Tokens...');
    // Navigate to listing page
  }

  downloadCSV() {
    console.log('Downloading CSV...');
    // Implement CSV download logic
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'In Progress': 'status-progress',
      'Completed': 'status-completed',
      'Pending': 'status-pending'
    };
    return statusMap[status] || '';
  }

  getEventClass(event: string): string {
    return event === 'Completed' ? 'event-completed' : 'event-retired';
  }
}