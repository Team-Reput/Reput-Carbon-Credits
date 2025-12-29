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

interface ProjectType {
  label: string;
  value: string;
  color: string;
}

interface Country {
  label: string;
  value: string;
  flag: string;
  code: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
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
  
  // Filter states
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

  // Project Types
  projectTypes: ProjectType[] = [
    { label: 'Biodiversity', value: 'biodiversity', color: '#10B981' },
    { label: 'Carbon offsetting', value: 'carbon-offsetting', color: '#10B981' },
    { label: 'Contribution', value: 'contribution', color: '#F59E0B' },
    { label: 'Energy Attributes', value: 'energy-attributes', color: '#3B82F6' }
  ];

  selectedProjectTypes: string[] = [];

  // Countries
  countries: Country[] = [
    { label: 'India', value: 'india', flag: '🇮🇳', code: 'IN' },
    { label: 'Brazil', value: 'brazil', flag: '🇧🇷', code: 'BR' },
    { label: 'United States of America', value: 'usa', flag: '🇺🇸', code: 'US' },
    { label: 'Bangladesh', value: 'bangladesh', flag: '🇧🇩', code: 'BD' },
    { label: 'Kenya', value: 'kenya', flag: '🇰🇪', code: 'KE' },
    { label: 'France', value: 'france', flag: '🇫🇷', code: 'FR' },
    { label: 'Italy', value: 'italy', flag: '🇮🇹', code: 'IT' },
    { label: 'Spain', value: 'spain', flag: '🇪🇸', code: 'ES' },
    { label: 'Netherlands', value: 'netherlands', flag: '🇳🇱', code: 'NL' },
    { label: 'Germany', value: 'germany', flag: '🇩🇪', code: 'DE' }
  ];

  selectedCountries: string[] = [];
  countrySearchQuery: string = '';

  // Vintage Year Range
  vintageYearRange: number[] = [2015, 2025];

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

  constructor(public router: Router) {}

  get filteredCountries(): Country[] {
    if (!this.countrySearchQuery) {
      return this.countries;
    }
    const query = this.countrySearchQuery.toLowerCase();
    return this.countries.filter(country => 
      country.label.toLowerCase().includes(query) || 
      country.code.toLowerCase().includes(query)
    );
  }

  get filteredProjects() {
    return this.projects.filter(project => {
      // Search filter
      const matchesSearch = project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = this.selectedStatus === 'all' || 
                          (this.selectedStatus === 'in-stock' && project.inStock);
      
      // Country filter
      const matchesCountry = this.selectedCountries.length === 0 || 
                            this.selectedCountries.includes(project.country.toLowerCase());
      
      // Project type filter (you can enhance this based on your project tags)
      const matchesProjectType = this.selectedProjectTypes.length === 0 || 
                                this.selectedProjectTypes.some(type => 
                                  project.tag.toLowerCase().includes(type)
                                );
      
      return matchesSearch && matchesStatus && matchesCountry && matchesProjectType;
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

  toggleProjectType(type: string) {
    const index = this.selectedProjectTypes.indexOf(type);
    if (index > -1) {
      this.selectedProjectTypes.splice(index, 1);
    } else {
      this.selectedProjectTypes.push(type);
    }
  }

  toggleCountry(country: string) {
    const index = this.selectedCountries.indexOf(country);
    if (index > -1) {
      this.selectedCountries.splice(index, 1);
    } else {
      this.selectedCountries.push(country);
    }
  }

  onVintageYearChange() {
    // Ensure min is always less than max
    if (this.vintageYearRange[0] > this.vintageYearRange[1]) {
      const temp = this.vintageYearRange[0];
      this.vintageYearRange[0] = this.vintageYearRange[1];
      this.vintageYearRange[1] = temp;
    }
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.selectedStatus = 'all';
    this.selectedSort = 'newest';
    this.selectedPrice = 'low-high';
    this.selectedProjectTypes = [];
    this.selectedCountries = [];
    this.countrySearchQuery = '';
    this.vintageYearRange = [2015, 2025];
  }

  applyFilters() {
    console.log('Filters applied:', {
      projectTypes: this.selectedProjectTypes,
      countries: this.selectedCountries,
      vintageYear: this.vintageYearRange
    });
    // Add your filter application logic here
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

  detail(): void { 
    this.router.navigate(['/detail']);
  }

  openProjectDetails(project: any) {
    console.log("🟢 Card clicked!", project);
    this.router.navigate(['/detail']);
  }
}