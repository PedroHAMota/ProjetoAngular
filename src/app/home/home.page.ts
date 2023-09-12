import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  isModalOpen = false;
  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }
  isLoading: boolean = false;
  funcionarios: any;

  constructor() {
    this.getFuncionarios()
  }



  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/api2/funcionarios/listar.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response['funcionarios']
      console.log(response)
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  remover(codigo:any){
    this.isLoading = true;
    fetch('http://localhost/api2/funcionarios/remover.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: codigo })
			}
		)
    .then(response => response.json())
    .then(response => {
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }


}

