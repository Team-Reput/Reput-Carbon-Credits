import { CommonModule } from '@angular/common';
import { Component , HostListener,ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   menuOpen: boolean = false;
   languageOpen: boolean = false;


   constructor(private eRef : ElementRef){}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

      // close language dropdown when menu closes
    if (!this.menuOpen) this.languageOpen = false;
  }

  toggleLanguage(){
    this.languageOpen = !this.languageOpen;
  }

  @HostListener('document:click',['$event'])
  clickOutside(event : Event){
    if(!this.eRef.nativeElement.contains(event.target)){
      this.menuOpen     = false;
      this.languageOpen = false;
    }
  }


}
