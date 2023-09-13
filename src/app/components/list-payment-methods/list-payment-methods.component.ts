import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-payment-methods',
  templateUrl: './list-payment-methods.component.html',
  styleUrls: ['./list-payment-methods.component.scss']
})

export class ListPaymentMethodsComponent implements OnInit {
  paymentMethods: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = false

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPageData(this.currentPage);
  }

  loadPageData(page: number): void {
    this.loading = true;
    this.apiService.getPaymentMethods(page).subscribe(
      (data: any) => {
        this.paymentMethods = Object.values(data.data);
        this.currentPage = data.current_page;
        this.totalPages = data.last_page;
        this.loading = false
      },
      (error) => {
        console.error(error);
        this.loading = false
      }
    );
  }

  nuevoMetodoPago: any = {
    icono: "ejemplo.svg",
    filesToUpload: {},
    nameFolder: ""
  };
  modalIsOpen: boolean = false;
  openModalCreateMethod() {
    this.modalIsOpen = true;
  }
  closeModalCreateMethod() {
    this.modalIsOpen = false;
  }

  createPaymentMethod() {
    console.log(this.nuevoMetodoPago)
    this.apiService.addPaymentMethod(this.nuevoMetodoPago).subscribe(
      (data: any) => {
        this.nuevoMetodoPago = {
          icono: "ejemplo.svg",
          filesToUpload: {},
          nameFolder: ""
        };
        this.loadPageData(this.currentPage);
        this.closeModalCreateMethod(); //limpia el form y cierra el modal
      },
      (error) => {
        console.error(error);
      }
    );
  }

  modalEditIsOpen: boolean = false;
  methodToEdit: any = {};
  dataToEdit: any = {
    name: this.methodToEdit.name,
    description: this.methodToEdit.description,
    status_id: this.methodToEdit.status_id,
    filesToUpload: {},
    nameFolder: ""
  }
  openModalEditMethod(id: number) {
    console.log(id);
    this.modalEditIsOpen = true;
    this.apiService.getPaymentMethodById(id).subscribe(
      (data: any) => {
        console.log(data);
        this.methodToEdit = data;
        console.log(this.methodToEdit)
        this.dataToEdit.name = this.methodToEdit.name;
        this.dataToEdit.description = this.methodToEdit.description;
        this.dataToEdit.status_id = this.methodToEdit.status_id;
      },
      (error) => {
        console.error(error)
      }
    )
  }
  closeModalEditMethod() {
    this.modalEditIsOpen = false;
  }

  updatePaymentMethod() {
    this.apiService.updatePaymentMethod(this.methodToEdit.id, this.dataToEdit).subscribe(
      (data: any) => {
        console.log(this.dataToEdit)
        this.loadPageData(this.currentPage);
        this.closeModalEditMethod();
      },
      (error) => {
        console.error(error)
      }
    )
  }


  methodToOpen: any = {};
  modalMethodIsOpen: boolean = false;
  openModalMethod(id: number) {
    this.modalMethodIsOpen = true;
    this.apiService.getPaymentMethodById(id).subscribe(
      (data: any) => {
        this.methodToOpen = data;
      },
      (error) => {
        console.error(error)
      }
    )
  }
  closeModalMethod() {
    this.modalMethodIsOpen = false;
  }



  deleteMethod(id: number) {
    this.apiService.deletePaymentMethod(id).subscribe(
      (data: any) => {
        this.loadPageData(this.currentPage);
      },
      (error) => { console.error(error) }
    )
  }
}
