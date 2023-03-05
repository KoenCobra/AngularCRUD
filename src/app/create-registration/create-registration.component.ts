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

    this.registerFrom.controls['height'].valueChanges.subscribe(response => {
      this.calculateBMI(response);
    })


  }

  public registerFrom!: FormGroup

  submitForm() {
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
