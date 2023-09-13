import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http:///booking-api.bti-dev.tech/api/v1/paymentMethods';
  constructor(private http: HttpClient) { }

  getPaymentMethods(page: number){ //GET ALL PAYMENT METHODS
    return this.http.get(`${this.url}/list?page=${page}`);
  }
  addPaymentMethod(paymentMethod: any){ //ADD A PAYMENT METHOD
    return this.http.post(`${this.url}/create`, paymentMethod);
  }

  updatePaymentMethod(id: number, paymentMethod: any) { //UPDATE A PAYMENT METHOD
    return this.http.put(`${this.url}/update/${id}`, paymentMethod);
  }

  getPaymentMethodById(id: number) { //GET 1 PAYMENT METHOD BY ID
    return this.http.get(`${this.url}/detail/${id}`);
  }

  deletePaymentMethod(id: number) { //DELETE 1 PAYMENT METHOD BY ID
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
