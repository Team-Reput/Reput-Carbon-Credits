import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder,private router : Router){}

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
      this.router.navigate(['/dash']);
    }else{
      console.log('Form is invalid');
    }
  }

  singIn():void{
    this.router.navigate(['/onboarding']);
  }
}
