import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../common/navbar/navbar.component';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  vintage: number;
  country: string;
  countryFlag: string;
  registry: string;
  industry: string;
  price: number;
  available: number;
  sdgs: number[];
  status: 'active' | 'stock';
  badge?: string;
}

type ViewMode = 'grid' | 'list' | 'compact';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

@Component({
  selector: 'app-buyer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {
  // Profile data
  profileName = 'ABFL Pvt Ltd';
  profileEmail = 'rahulsharma@gmail.com';
  profileImage = 'assets/profile.jpg';
  
  // Stats
  stats = {
    projectsPartnered: 4,
    creditsSecured: 2000,
    walletBalance: 1200.00,
    impactScore: 200
  };

  // Filter and view options
  searchQuery = '';
  selectedStatus = 'all';
  selectedSort: SortOption = 'newest';
  selectedPriceRange = 'all';
  viewMode: ViewMode = 'grid';

  statusOptions = [
    { value: 'all', label: 'Status: All' },
    { value: 'active', label: 'Active' },
    { value: 'stock', label: 'In Stock' }
  ];

  sortOptions = [
    { value: 'newest', label: 'Sort: Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A-Z' }
  ];

  priceRangeOptions = [
    { value: 'all', label: 'Price: Low to High' },
    { value: '0-200', label: '$0 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: '500+', label: '$500+' }
  ];

  // Projects data
  allProjects: Project[] = [
    {
      id: 1,
      name: 'Vent du Midi',
      description: 'ISO-compliant Life Cycle Assessment platform enabling large-scale wind projects to offset carbon emissions acro...',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=500&h=300&fit=crop',
      vintage: 2023,
      country: 'France',
      countryFlag: '🇫🇷',
      registry: 'Gold Standard',
      industry: 'Wind',
      price: 240,
      available: 800000,
      sdgs: [8],
      status: 'active',
      badge: 'Excellent Entry'
    },
    {
      id: 2,
      name: 'Verde Biomassa Italia',
      description: 'High-efficiency biomass facilities converting organic waste into clean power for rural and urban grids...',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop',
      vintage: 2025,
      country: 'Italy',
      countryFlag: '🇮🇹',
      registry: 'Verra Registry',
      industry: 'Biomass',
      price: 196,
      available: 1050000,
      sdgs: [7],
      status: 'stock',
      badge: 'Excellent Entry'
    },
    {
      id: 3,
      name: 'IberHydro',
      description: 'Peatland restoration to lock carbon in soil and rejuvenate native wildlife habitats.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop',
      vintage: 2022,
      country: 'Spain',
      countryFlag: '🇪🇸',
      registry: 'Gold Standard',
      industry: 'Peatland Restoration',
      price: 200,
      available: 92000,
      sdgs: [7],
      status: 'stock',
      badge: 'Market Stand Out'
    },
    {
      id: 4,
      name: 'AlpenTherm Geo',
      description: 'Deep-well geothermal plants harnessing natural heat to provide continuous baseload energy with minimal emissi...',
      image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&h=300&fit=crop',
      vintage: 2023,
      country: 'Germany',
      countryFlag: '🇩🇪',
      registry: 'EU ETS',
      industry: 'Geothermal',
      price: 240,
      available: 740000,
      sdgs: [7],
      status: 'active',
      badge: 'Market Stand Out'
    }
  ];

  filteredProjects: Project[] = [];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.allProjects];

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.industry.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === this.selectedStatus);
    }

    // Price range filter
    if (this.selectedPriceRange !== 'all') {
      if (this.selectedPriceRange === '0-200') {
        filtered = filtered.filter(p => p.price <= 200);
      } else if (this.selectedPriceRange === '200-500') {
        filtered = filtered.filter(p => p.price > 200 && p.price <= 500);
      } else if (this.selectedPriceRange === '500+') {
        filtered = filtered.filter(p => p.price > 500);
      }
    }

    // Sort
    switch (this.selectedSort) {
      case 'newest':
        filtered.sort((a, b) => b.vintage - a.vintage);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    this.filteredProjects = filtered;
  }

  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  setViewMode(mode: ViewMode) {
    this.viewMode = mode;
  }

  toggleFavorite(project: Project, event: Event) {
    event.stopPropagation();
    console.log('Toggle favorite:', project.name);
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}