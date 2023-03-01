import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'Quarterly', 'Yearly']
  public importantList = ["Toxic fat reduction", "Energy and endurance", "building lean muscle",
    "Healthier digestive system", "Sugar craving body", "Fitness"]
  constructor() { }

  ngOnInit(): void {
  }

}
