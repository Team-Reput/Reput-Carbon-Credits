import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../common/navbar/navbar.component';
import {  Router, RouterModule  } from '@angular/router'


interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  sdgs: number;
  sdgsLabel: string;
  tag: string;
  vintage: string;
  country: string;
  countryFlag: string;
  registry: string;
  industry: string;
  price: number;
  available: number;
  inStock: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchQuery: string = '';
  selectedStatus: string = 'all';
  selectedSort: string = 'newest';
  selectedPrice: string = 'low-high';
  currency: string = 'US ($)';
  viewMode: string = 'grid';
  
  filterExpanded = {
    projectType: false,
    country: false,
    vintageYear: false,
    priceRange: false,
    registry: false,
    unSdgs: false,
    stocks: false,
    impacts: false
  };

  projects: Project[] = [
    {
      id: 1,
      name: 'Vent du Midi',
      description: 'ISO-compliant Life Cycle Assessment platform enabling large-scale wind projects to ...',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=600&fit=crop',
      sdgs: 11,
      sdgsLabel: 'SDGs',
      tag: 'Renewable Energy',
      vintage: '2022 |2023',
      country: 'France',
      countryFlag: '🇫🇷',
      registry: 'Gold Standard',
      industry: 'Wind',
      price: 240,
      available: 890000,
      inStock: true
    },
    {
      id: 2,
      name: 'Verde Biomassa Italia',
      description: 'High-efficiency biomass facilities converting organic waste into clean power for  ...',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=600&fit=crop',
      sdgs: 8,
      sdgsLabel: 'SDGs',
      tag: 'Renewable Energy',
      vintage: '2022 |2024',
      country: 'Italy',
      countryFlag: '🇮🇹',
      registry: 'Verra Registry',
      industry: 'Biomass',
      price: 190,
      available: 1050000,
      inStock: true
    },
    {
      id: 3,
      name: 'Solar Suryan',
      description: 'Community-scale photovoltaic projects delivering reliable solar power and  .',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
      sdgs: 5,
      sdgsLabel: 'SDGs',
      tag: 'Renewable Energy',
      vintage: '2022 |2023',
      country: 'Spain',
      countryFlag: '🇪🇸',
      registry: 'Gold Standard',
      industry: 'Hydropower',
      price: 21000,
      available: 930000,
      inStock: true
    },
    {
      id: 4,
      name: 'Delta Capture',
      description: 'Industrial carbon capture and storage network capturing CO₂ directly from ..',
      image: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=800&h=600&fit=crop',
      sdgs: 8,
      sdgsLabel: 'SDGs',
      tag: 'Carbon Management',
      vintage: '2022 |2023 ',
      country: 'Netherlands',
      countryFlag: '🇳🇱',
      registry: 'Puro.earth',
      industry: 'Direct Air',
      price: 290,
      available: 500000,
      inStock: true
    },
    {
      id: 5,
      name: 'AlpenTherm Geo',
      description: 'Deep-well geothermal plants harnessing natural heat to provide continuous...',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop',
      sdgs: 3,
      sdgsLabel: 'SDGs',
      tag: 'Nature-Based Solutions',
      vintage: '2022 |2023',
      country: 'Germany',
      countryFlag: '🇩🇪',
      registry: 'EU ETS',
      industry: 'Geothermal',
      price: 240,
      available: 740000,
      inStock: true
    },
    {
      id: 6,
      name: 'IberHydro',
      description: 'Peatland restoration to lock carbon in soil and rejuvenate native wildlife ..',
      // image: 'https://images.unsplash.com/photo-1587048170540-9b5fc127e528?w=800&h=600&fit=crop',
      image: 'assets/images/verdeBiomass.png',
      sdgs: 7,
      sdgsLabel: 'SDGs',
      tag: 'Renewable Energy',
      vintage: '2022 |2023',
      country: 'Spain',
      countryFlag: '🇪🇸',
      registry: 'Gold Standard',
      industry: 'Peatland',
      price: 220,
      available: 92000,
      inStock: true
    }
  ];


  

  constructor(  public router: Router) {  }




  get filteredProjects() {
    return this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || 
                          (this.selectedStatus === 'in-stock' && project.inStock);
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (this.selectedSort === 'newest') return b.id - a.id;
      if (this.selectedSort === 'oldest') return a.id - b.id;
      return 0;
    }).sort((a, b) => {
      if (this.selectedPrice === 'low-high') return a.price - b.price;
      if (this.selectedPrice === 'high-low') return b.price - a.price;
      return 0;
    });
  }

  toggleFilter(filterName: keyof typeof this.filterExpanded) {
    this.filterExpanded[filterName] = !this.filterExpanded[filterName];
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    this.selectedSort = 'newest';
    this.selectedPrice = 'low-high';
  }

  toggleFavorite(project: Project, event: Event) {
    event.stopPropagation();
    console.log('Toggled favorite for:', project.name);
  }

  setViewMode(mode: string) {
    this.viewMode = mode;
  }


  getSdgColors(project: Project): string[] {
    const colors = [
      '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21',
      '#26BDE2', '#FCC30B', '#A21942', '#FD6925', '#DD1367',
      '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B',
      '#00689D', '#19486A'
    ];
    return colors.slice(0, project.sdgs);
  }

  getGradientString(project: Project): string {
    const colors = this.getSdgColors(project);
    const segmentSize = 100 / colors.length;
    let gradient = 'conic-gradient(';
    
    colors.forEach((color, index) => {
      const startAngle = index * segmentSize;
      const endAngle = (index + 1) * segmentSize;
      gradient += `${color} ${startAngle}% ${endAngle}%`;
      if (index < colors.length - 1) gradient += ', ';
    });
    
    gradient += ')';
    return gradient;
  }

  isFavorite: boolean = false;

  // toggleFavorite(): void {
  //   this.isFavorite = !this.isFavorite;
  // }


  detail(): void { 
     this.router.navigate(['/detail']);
  }

  openProjectDetails(project: any) {
  console.log("🟢 Card clicked!", project);

  this.router.navigate(['/detail']);

  // this.router.navigate(['/main/industry/lca/project-details'], {
  //   queryParams: { id: project.id }
  // });


}

}