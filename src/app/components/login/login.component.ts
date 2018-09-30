import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private uri = 'http://localhost:4000/login';
  loggedIn: any = new BehaviorSubject<boolean>(false);
  jwtToken = this.getToken();
  token: any;
  angForm: FormGroup;
  email = '';
  password = '';
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  login(signupForm: NgForm) {
    this.http
      .post(this.uri, {
        email: signupForm.value.email,
        password: signupForm.value.password
      })
      .subscribe(
        (response: any) => {
          this.loggedIn.next(true);
          this.token = response.token;
          this.saveToken(response.token);
          this.toastr.success(
            response && response.user && response.user.nom
              ? `Bonjour ${response.user.nom} ${response.user.prenom}`
              : 'Connecté :) !'
          );
          this.router.navigate(['personnes']);
        },
        errorResp => {
          this.loggedIn.next(undefined);
          errorResp.error
            ? this.toastr.error(errorResp.error.message)
            : this.toastr.error('An unknown error has occured.');
        }
      );
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}
}
