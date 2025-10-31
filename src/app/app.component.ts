// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
//   encapsulation: ViewEncapsulation.None 
// })
// export class AppComponent {
//   title = 'reput-carbon';
// }




// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TemplatesComponent } from './templates/templates.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, FormsModule, TemplatesComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class AppComponent {
//   title = 'reput-carbon';
// }








// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TemplatesComponent } from './templates/templates.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, FormsModule, TemplatesComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class AppComponent {
//   title = 'reput-carbon';
// }





// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TemplatesComponent } from './templates/templates.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, FormsModule, TemplatesComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class AppComponent {
//   title = 'reput-carbon';
// }



// import { CommonModule } from '@angular/common';
// import { Component, ViewEncapsulation } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TemplatesComponent } from './templates/templates.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, FormsModule, TemplatesComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   encapsulation: ViewEncapsulation.None
// })
// export class AppComponent {
//   title = 'reput-carbon';
// }




import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './shared-component/popup/popup.component';
// import { MenuBarComponent } from './common/menu-bar/menu-bar.component';
 




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,RouterModule,ReactiveFormsModule,PopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'reput-carbon';
}
