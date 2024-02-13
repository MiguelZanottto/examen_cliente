import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesPropias } from './validaciones';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fechaActual : Date = new Date()
  precio : number = 0;
  numeroLinea : number = 1;

  totalEnvios = 0;
  totalPeso = 0;
  totalImporteEspana = 0;
  totalImporteEuropa = 0;
  totalImporeteAmerica = 0;
  importeTotal = 0;


  formularioCliente = new FormGroup({
    fecha : new FormControl( `${this.fechaActual.getDate()}-${this.fechaActual.getMonth() + 1}-${this.fechaActual.getFullYear()}`, [Validators.required, Validators.pattern(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/), ValidacionesPropias.fecha]),
    empresa: new FormControl( '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    instagram: new FormControl('', [Validators.required, Validators.pattern(/^@[^\W][\w.]{0,28}[^\W]$/)]),
    cliente: new FormControl([true]),
    origen: new FormControl('-', [ValidacionesPropias.origen]),
    pais: new FormControl('extranjero', [Validators.required]),
    nombrePais: new FormControl('', [ValidacionesPropias.pais])
  });

  formularioProducto = new FormGroup({
    destino: new FormControl('España'),
    peso: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(2.99), Validators.pattern(/^[0-3].[0-9][0-9]$/)]),
    envio: new FormControl('-', [Validators.pattern(/^(Certificado|Paquete)$/)])
  });
    

  lineas : {numero : number , destino : string, peso : string , envio : string, precio : number} [] = []

  calcularPrecio(){
    if(this.formularioProducto.valid){
      if(this.formularioProducto.value.destino == "España"){
        if(this.formularioProducto.value.envio == "Certificado"){
          if(Number(this.formularioProducto.value.peso) < 1){
            this.precio = 6
          } else if(Number(this.formularioProducto.value.peso) < 2){
            this.precio = 8
          } else if(Number(this.formularioProducto.value.peso) < 3){
            this.precio = 10
          }
        } else {
          if(Number(this.formularioProducto.value.peso) < 1){
            this.precio = 4
          } else if(Number(this.formularioProducto.value.peso) < 2){
            this.precio = 5
          } else if(Number(this.formularioProducto.value.peso) < 3){
            this.precio = 6
          }
        }
        } else if(this.formularioProducto.value.destino == "Europa") {
          if(this.formularioProducto.value.envio == "Certificado"){
            if(Number(this.formularioProducto.value.peso) < 1){
              this.precio = 9
            } else if(Number(this.formularioProducto.value.peso) < 2){
              this.precio = 12
            } else if(Number(this.formularioProducto.value.peso) < 3){
              this.precio = 16
            }
          } else {
            if(Number(this.formularioProducto.value.peso) < 1){
              this.precio = 7
            } else if(Number(this.formularioProducto.value.peso) < 2){
              this.precio = 9
            } else if(Number(this.formularioProducto.value.peso) < 3){
              this.precio = 12
            }
          }
        } else {
          if(this.formularioProducto.value.envio == "Certificado"){
            if(Number(this.formularioProducto.value.peso) < 1){
              this.precio = 12
            } else if(Number(this.formularioProducto.value.peso) < 2){
              this.precio = 16
            } else if(Number(this.formularioProducto.value.peso) < 3){
              this.precio = 20
            }
          } else {
            if(Number(this.formularioProducto.value.peso) < 1){
              this.precio = 10
            } else if(Number(this.formularioProducto.value.peso) < 2){
              this.precio = 12
            } else if(Number(this.formularioProducto.value.peso) < 3){
              this.precio = 14
            }
          }
        }
    } 
  }

  agregarProducto(){
    if(this.formularioProducto.valid){
      this.lineas.push(
        {numero: this.numeroLinea++, destino: this.formularioProducto.value.destino!, peso: this.formularioProducto.value.peso! + " kg", envio: this.formularioProducto.value.envio!, precio: this.precio!}
      );
      this.ordenarArray();
    } else {
      alert("NO SE PUEDE AGREGAR EL PRODUCTO")
    }
  }

  borrarProducto(posicion : number){
    this.lineas.splice(posicion - 1, 1);
    this.ordenarArray()
  }

   ordenarArray(){
     this.numeroLinea = 1;
     this.lineas.map(linea => linea.numero = this.numeroLinea++)
     this.limpiarCasillas()
     for(let i = 0; i < this.lineas.length; i++){
       if(this.lineas[i].destino == "España"){
        this.totalEnvios += 1;
        this.totalPeso += Number((this.lineas[i].peso).substring(0,4));
        this.totalImporteEspana += this.lineas[i].precio;
        this.importeTotal += this.lineas[i].precio; 
       } else if(this.lineas[i].destino == "Europa"){
        this.totalEnvios += 1;
        this.totalPeso += Number((this.lineas[i].peso).substring(0,4));
        this.totalImporteEuropa += this.lineas[i].precio;
        this.importeTotal += this.lineas[i].precio; 
       } else {
        this.totalEnvios += 1;
        this.totalPeso += Number((this.lineas[i].peso).substring(0,4));
        this.totalImporeteAmerica += this.lineas[i].precio;
        this.importeTotal += this.lineas[i].precio; 
       }
     }
   }

   limpiarCasillas(){
    this.totalEnvios = 0;
    this.totalPeso = 0;
    this.totalImporteEspana = 0;
    this.totalImporteEuropa = 0;
    this.totalImporeteAmerica = 0;
    this.importeTotal = 0;
  }

  enviarDatos(){
    if(this.formularioCliente.valid){
      if(this.lineas.length != 0){
        alert("DATOS ENVIADOS POR INTERNO (CONSOLA)")
        console.log(JSON.stringify(this.formularioCliente.value))
      } else {
        alert("NO HAY NINGUNA LINEA DE PEDIDO")
      }
    } else {
      alert("ERROR EN ALGUN CAMPO DEL FORMULARIO")
    }
  }
}