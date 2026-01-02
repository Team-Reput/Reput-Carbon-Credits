import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  imports: [CommonModule,RouterLink],
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.scss'
})
export class SupplierDashboardComponent {
  sidebarExpanded = false;
  userName = 'John';
  companyName = 'ABFL Pvt Ltd';

  showUserMenu = false;

 

  constructor(public router: Router, private authservice : AuthService) {}

   ngOnInit(): void {
    this.getProjectDashboard();
  }

  dashboardStats: DashboardStat[] = [];
  

  registeredProjects: Project[] = [];

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

    this.router.navigate(['/seller/project/about-project']);
  }

  viewRegisteredProject(project: Project): void {
    console.log('Viewing project:', project);

    this.router.navigate(['/seller/project/token-status']);
  }

  editProject(project: Project): void {
    console.log('Editing project:', project);
  }

  registerNewProject(): void {
    console.log('Registering new project');
    this.router.navigate(['/seller/project/register-project']);
  }

  navigatePortfolio(): void {
    console.log('Registering new project');
    this.router.navigate(['/seller/project/portfolio']);
  }

  viewAllNotifications(): void {
    console.log('Viewing all notifications');
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB');
  }




  getProjectDashboard(): void {
    try {
      const obj = {
      user_id : 70 
    }

    this.authservice.getProjectDashboard(obj).subscribe({
      next:(res:any)=>{
        if(res.success && res.data?.length){
          console.log(res.data);
          const dashboard = res.data[0];
        //  STATS
        this.dashboardStats = [
          {
            title: 'Active Projects',
            value: dashboard.o_stats.active_projects.toString(),
            subtitle: 'currently being validated/verified',
            icon: 'trending_up'
          },
          {
            title: 'Credits Issued',
            value: dashboard.o_stats.credits_issued.toString(),
            subtitle: 'Total credits issued across projects',
            icon: 'content_copy'
          },
          {
            title: 'Credits Tokenized',
            value: dashboard.o_stats.credits_tokenized.toString(),
            subtitle: 'Credits processed via bridge',
            icon: 'bar_chart'
          },
          {
            title: 'Projects Registered',
            value: dashboard.o_stats.projects_registered.toString(),
            subtitle: 'Successfully submitted to registries',
            icon: 'check_circle'
          }
        ];

        //Project List
        this.registeredProjects = dashboard.o_projects.map( (p:any) => ({
          name:   p.project_name,
          type:   p.project_type,
          status: p.status,
          date:   this.formatDate(p.last_updated)
        }) );


        }
      },
      error:(err:any)=>{
        console.error(err);
      }
    })

    } catch (error) {
      console.log(error);
    }

  }
}