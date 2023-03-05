import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
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


  constructor(private fb: FormBuilder, private api: ApiService, private toast: NgToastService) { }

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


  }

  public registerFrom!: FormGroup

  submitForm() {
    this.api.postRegistration(this.registerFrom.value).subscribe(res => {
      this.toast.success({ detail: "Success", summary: "Enquiry added successfully", duration: 3000 });
      this.registerFrom.reset();
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

}
