import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'Quarterly', 'Yearly']
  public importantList = ["Toxic fat reduction", "Energy and endurance", "building lean muscle",
    "Healthier digestive system", "Sugar craving body", "Fitness"]

  public registerFrom!: FormGroup
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private toast: NgToastService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.registerFrom = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquireDate: [''],
    });

    this.registerFrom.controls['height'].valueChanges.subscribe(response => {
      this.calculateBMI(response);
    })

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.GetRegisteredUser(this.userIdToUpdate).subscribe(res => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res)
      });
    })

  }

  submitForm() {
    this.api.postRegistration(this.registerFrom.value).subscribe(res => {
      this.toast.success({ detail: "Success", summary: "Enquiry added successfully", duration: 3000 });
      this.registerFrom.reset();
    });
  }

  updateForm() {
    this.api.updateRegisteredUser(this.registerFrom.value, this.userIdToUpdate).subscribe(res => {
      this.toast.success({ detail: "Success", summary: "User updated successfully", duration: 3000 });
      this.registerFrom.reset();
      this.router.navigate(['/list'])
    });
  }

  calculateBMI(heightValue: number) {
    const weight = this.registerFrom.value.weight;
    const height = heightValue;

    const bmi = weight / (height * height);

    this.registerFrom.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerFrom.controls['bmiResult'].patchValue('Underweight');
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerFrom.controls['bmiResult'].patchValue('Normal weight');
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerFrom.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registerFrom.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registerFrom.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquireDate: user.enquireDate,
    })
  }
}
