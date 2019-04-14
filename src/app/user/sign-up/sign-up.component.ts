import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';
import {User} from '../../models/User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private toastr: ToastrService) { }

  terms: boolean = false;
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      login: '',
      password: '',
      name: '',
      tnA: false
    };
  }

  OnSubmit(form: NgForm) {
    localStorage.removeItem('userToken');

    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.code === 1) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        } else {
          this.toastr.error(data.message);
        }
      });
  }
}
