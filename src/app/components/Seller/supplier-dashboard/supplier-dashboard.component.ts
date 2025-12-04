import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DashboardStat {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}

interface Project {
  name: string;
  type: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.scss'
})
export class SupplierDashboardComponent {
  sidebarExpanded = false;
  userName = 'John';
  companyName = 'ABFL Pvt Ltd';

  showUserMenu = false;

  constructor(public router: Router) {}

  dashboardStats: DashboardStat[] = [
    { 
      title: 'Active Projects', 
      value: '2', 
      subtitle: 'currently being validated/verified', 
      icon: 'trending_up' 
    },
    { 
      title: 'Credits Issued', 
      value: '0', 
      subtitle: 'Total credits issued across projects', 
      icon: 'content_copy' 
    },
    { 
      title: 'Credits Tokenized', 
      value: '0', 
      subtitle: 'Credits processed via bridge', 
      icon: 'bar_chart' 
    },
    { 
      title: 'Projects Registered', 
      value: '3', 
      subtitle: 'Successfully submitted to registries', 
      icon: 'check_circle' 
    }
  ];

  registeredProjects: Project[] = [
    { 
      name: 'Green Wind Solar Hybrid', 
      type: 'Renewable Energy', 
      status: 'Active', 
      date: '10/09/2025' 
    },
    { 
      name: 'Blue Forest Reforestation', 
      type: 'Reforestation', 
      status: 'Active', 
      date: '11/09/2025' 
    },
    { 
      name: 'Waste To Energy Kerala', 
      type: 'Renewable Energy', 
      status: 'Active', 
      date: '12/09/2025' 
    }
  ];

  projectTracker: Project[] = [
    { 
      name: 'Delta Capture', 
      type: 'Carbon Management', 
      status: 'Verification', 
      date: '20/12/2025' 
    },
    { 
      name: 'AlpenTherm Geo', 
      type: 'Nature-Based Solutions', 
      status: 'Validation', 
      date: '20/12/2025' 
    },
    { 
      name: 'IberHydro', 
      type: 'Renewable Energy', 
      status: 'Issuance', 
      date: '20/12/2025' 
    }
  ];

  notifications: string[] = [
    'Registry submission successful – awaiting credit issuance.',
    'Verification report uploaded by VVB.',
    'Project manager assigned: Sarah Johnson.'
  ];

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Active': 'status-active',
      'Verification': 'status-verification',
      'Validation': 'status-validation',
      'Issuance': 'status-issuance'
    };
    return statusClasses[status] || 'status-default';
  }

  viewProject(project: Project): void {
    console.log('Viewing project:', project);
  }

  editProject(project: Project): void {
    console.log('Editing project:', project);
  }

  registerNewProject(): void {
    console.log('Registering new project');
    this.router.navigate(['/register-project']);
  }

  viewAllNotifications(): void {
    console.log('Viewing all notifications');
  }
}