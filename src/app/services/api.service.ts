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
    return this.http.get<User>(`${this.baseUrl}`)

  }

  deleteRegisteredUser(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)

  }

  updateRegisteredUsers(registerObject: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObject)

  }

  postRegistration(registerObject: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObject)
  }

  deleteRegisteredUsers(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)

  }
}
