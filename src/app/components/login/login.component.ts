import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private authService: AuthenticationService,
     private router: Router,
     private toast: HotToastService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.login.get('email')
  }

  get password(){
    return this.login.get('password')
  }

  submit(){
    if(!this.login.valid){
      return;
    }
    const {email, password} = this.login.value;
    this.authService.login(email!, password!).pipe(
      this.toast.observe({
        success: 'Logged successfully',
        loading: 'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })

  }
}
