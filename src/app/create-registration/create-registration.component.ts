import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'Quarterly', 'Yearly']
  public importantList = ["Toxic fat reduction", "Energy and endurance", "building lean muscle",
    "Healthier digestive system", "Sugar craving body", "Fitness"]


  constructor(private fb: FormBuilder) { }

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
  }

  public registerFrom!: FormGroup

}
