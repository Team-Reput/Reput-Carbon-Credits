import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../common/navbar/navbar.component';

interface HeroSlide {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  verifiedBy: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  active: boolean;
}

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  sdgs: number;
  badge: string;
  tag: string;
  vintage: string;
  country: string;
  countryFlag: string;
  registry: string;
  industry: string;
  price: number;
  available: number;
  category: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  carouselInterval: any;
  searchQuery = '';
  selectedStatus = 'all';
  selectedSort = 'newest';
  selectedPrice = 'low-high';

  heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'Wind Energy Projects',
      price: 105,
      description: 'Beyond supplying clean renewable power, these wind farms generate new jobs and technical training opportunities for nearby communities. They replace polluting fossil fuel power plants, reducing greenhouse gas emissions and improving air quality. Local businesses and households gain access to affordable energy, while governments meet their climate targets more effectively. The projects also strengthen energy independence and resilience.',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&h=800&fit=crop',
      verifiedBy: 'Verra'
    },
    {
      id: 2,
      title: 'Solar Power Solutions',
      price: 89,
      description: 'Revolutionary solar energy systems providing sustainable power to communities worldwide. These projects reduce carbon footprint while creating employment opportunities and energy independence.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&h=800&fit=crop',
      verifiedBy: 'Gold Standard'
    },
    {
      id: 3,
      title: 'Hydroelectric Systems',
      price: 125,
      description: 'Clean hydroelectric power generation that harnesses natural water flow to produce renewable energy. Supporting local communities with reliable and affordable electricity.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&h=800&fit=crop',
      verifiedBy: 'Verra'
    }
  ];

  categories: Category[] = [
    { id: 'agriculture', name: 'Agriculture', icon: '🌾', count: 230, active: true },
    { id: 'biodiversity', name: 'Biodiversity', icon: '🦋', count: 156, active: false },
    { id: 'blue-carbon', name: 'Blue carbon', icon: '🌊', count: 89, active: false },
    { id: 'forest', name: 'Forest', icon: '🌲', count: 445, active: false },
    { id: 'energy-emission', name: 'Energy emission', icon: '⚡', count: 312, active: false },
    { id: 'industry-processing', name: 'Industry Processing', icon: '🏭', count: 178, active: false },
    { id: 'renewable-energy', name: 'Renewable Energy', icon: '♻️', count: 523, active: false },
    { id: 'other', name: 'Other', icon: '📋', count: 92, active: false }
  ];

  projects: Project[] = [
    {
      id: 1,
      name: 'GreenFields Carbon',
      description: 'Regenerative farming practices improving soil health and sequestering CO₂ to mitigate climate change.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
      sdgs: 8,
      badge: 'Stock',
      tag: 'Agriculture',
      vintage: '2023',
      country: 'United States',
      countryFlag: '🇺🇸',
      registry: 'Verra',
      industry: 'Sustainable Agriculture',
      price: 200,
      available: 120000,
      category: 'agriculture'
    },
    {
      id: 2,
      name: 'SoilLife Plus',
      description: 'Organic manure enrichment helping degraded farmland restore its natural carbon sequestration.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
      sdgs: 9,
      badge: 'Stock',
      tag: 'Agriculture',
      vintage: '2022',
      country: 'Brazil',
      countryFlag: '🇧🇷',
      registry: 'Gold Standard',
      industry: 'Soil Enrichment',
      price: 190,
      available: 90000,
      category: 'agriculture'
    },
    {
      id: 3,
      name: 'Amazon Rainforest Conservation',
      description: 'Protecting vital forest ecosystems and supporting indigenous communities through sustainable practices.',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
      sdgs: 15,
      badge: 'Stock',
      tag: 'Forest',
      vintage: '2023',
      country: 'Brazil',
      countryFlag: '🇧🇷',
      registry: 'Verra',
      industry: 'Forest Conservation',
      price: 180,
      available: 250000,
      category: 'forest'
    },
    {
      id: 4,
      name: 'Coastal Mangrove Restoration',
      description: 'Restoring critical blue carbon ecosystems that protect coastlines and support marine biodiversity.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      sdgs: 14,
      badge: 'Stock',
      tag: 'Blue Carbon',
      vintage: '2024',
      country: 'Indonesia',
      countryFlag: '🇮🇩',
      registry: 'Gold Standard',
      industry: 'Marine Conservation',
      price: 220,
      available: 85000,
      category: 'blue-carbon'
    },
    {
      id: 5,
      name: 'Wind Farm Initiative',
      description: 'Large-scale wind energy generation reducing reliance on fossil fuels and creating clean power.',
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=600&fit=crop',
      sdgs: 7,
      badge: 'Stock',
      tag: 'Renewable Energy',
      vintage: '2023',
      country: 'Denmark',
      countryFlag: '🇩🇰',
      registry: 'EU ETS',
      industry: 'Wind Energy',
      price: 175,
      available: 340000,
      category: 'renewable-energy'
    },
    {
      id: 6,
      name: 'Biodiversity Corridor Project',
      description: 'Creating wildlife corridors to protect endangered species and maintain ecosystem balance.',
      image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&h=600&fit=crop',
      sdgs: 15,
      badge: 'Stock',
      tag: 'Biodiversity',
      vintage: '2022',
      country: 'Kenya',
      countryFlag: '🇰🇪',
      registry: 'Verra',
      industry: 'Wildlife Conservation',
      price: 210,
      available: 67000,
      category: 'biodiversity'
    }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 
      ? this.heroSlides.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopCarousel();
    this.startCarousel();
  }

  selectCategory(categoryId: string) {
    this.categories.forEach(cat => {
      cat.active = cat.id === categoryId;
    });
  }

  get activeCategory() {
    return this.categories.find(cat => cat.active);
  }

  get filteredProjects() {
    const activeCategory = this.activeCategory;
    return this.projects.filter(project => {
      const matchesCategory = !activeCategory || project.category === activeCategory.id;
      const matchesSearch = project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
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

  get totalSupply() {
    return this.filteredProjects.reduce((sum, project) => sum + project.available, 0);
  }

  get lowestPrice() {
    if (this.filteredProjects.length === 0) return 0;
    return Math.min(...this.filteredProjects.map(p => p.price));
  }

  toggleFavorite(project: Project, event: Event) {
    event.stopPropagation();
    console.log('Toggled favorite for:', project.name);
  }
}










// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-features',
//   standalone: true,
//   imports: [],
//   templateUrl: './features.component.html',
//   styleUrl: './features.component.scss'
// })
// export class FeaturesComponent {

// }
