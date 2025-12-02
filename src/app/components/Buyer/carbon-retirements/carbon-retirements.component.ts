import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../common/navbar/navbar.component';

interface RetirementProject {
  name: string;
  date: string;
  quantity: string;
  price: string;
}

@Component({
  selector: 'app-carbon-retirements',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NavbarComponent],
  templateUrl: './carbon-retirements.component.html',
  styleUrl: './carbon-retirements.component.scss'
})
export class CarbonRetirementsComponent {

  totalTonnes = 31;
  totalTransactions = 4;
  avoided = "1,500km of car travelled avoided";

  searchText: string = '';

  projects: RetirementProject[] = [
    { name: "Verde Biomassa Italia", date: "Sep 2, 2025", quantity: "5 tCO2e", price: "₹ 24,000.00" },
    { name: "Solar Suryan", date: "Sep 1, 2025", quantity: "12 tCO2e", price: "₹ 19,500.00" },
    { name: "Emerald Peat", date: "Aug 21, 2025", quantity: "10 tCO2e", price: "₹ 22,000.00" },
    { name: "Nordskog Reforest", date: "Aug 15, 2025", quantity: "4 tCO2e", price: "₹ 24,000.00" }
  ];

  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  downloadPDF(project: RetirementProject) {
    alert("Downloading PDF for: " + project.name);
  }

  share(project: RetirementProject) {
    alert("Share clicked for: " + project.name);
  }

}
