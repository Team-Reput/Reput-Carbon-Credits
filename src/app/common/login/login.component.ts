import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm! : FormGroup;

  constructor(private fb: FormBuilder,private router : Router,private authService: AuthService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      rememberMe:[false]
    })
  }

  onLogin():void{
    if(this.loginForm.valid){
      const {email, password, rememberMe} = this.loginForm.value;
      console.log('Login Details:', { email, password, rememberMe });

      const obj = {
        email: email.trim(),
        password: password
      }

      this.authService.UserLogin(obj).subscribe({
        next:(res)=> {
          if(res.success){
            console.log('Login successful:', res); 
            // localStorage.setItem('reput-credit', res.token); 
            sessionStorage.setItem('reput-credit', res.token);

            this.router.navigate(['/dash']);
          }else{
            console.log('Login failed:', res.message);
          }

        },
        error:(err)=> {
          console.error('Login failed:', err);
        }

      })

      
    }else{
      console.log('Form is invalid');
    }
  }

  singIn():void{
    this.router.navigate(['/onboarding']);
  }


}
