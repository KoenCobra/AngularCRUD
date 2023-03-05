import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "http://localhost:3000/enquiry"
  constructor(private http: HttpClient) { }

  getRegisteredUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`)

  }

  GetRegisteredUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)

  }

  updateRegisteredUser(registerObject: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObject)

  }

  postRegistration(registerObject: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObject)
  }

  deleteRegisteredUser(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)

  }
}
