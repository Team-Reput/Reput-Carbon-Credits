// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-popup',
//   standalone: true,
//   imports: [],
//   templateUrl: './popup.component.html',
//   styleUrl: './popup.component.scss'
// })
// export class PopupComponent {

// }




import { Component } from '@angular/core';
import { PopupService } from '../../services/popup-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  message  : string = '';
  showPopup: boolean = false;
  type     : 'success' | 'error' = 'success';

  constructor(private notificationService: PopupService) {
    this.notificationService.notification$.subscribe(data => {
      this.message   = data.message;
      this.showPopup = data.show;
      this.type      = data.type;
      // console.log(this.message,this.showPopup);
    });
  }

  closePopup() {
    this.showPopup = false;
  }

}


 