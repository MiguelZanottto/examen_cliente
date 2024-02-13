import { AbstractControl, ValidationErrors } from "@angular/forms";


export class ValidacionesPropias {
    
    static fecha(control: AbstractControl) : ValidationErrors| null {
        if(control.value){
            let fechaUsuario : string = control.value;
            const campos: string [] = fechaUsuario.split("-")
            const fechaHoy = new Date();
            fechaHoy.setHours(0,0,0,0);
            const fecha = new Date(Number(campos[2]), Number(campos[1])-1, Number(campos[0]));
            if(!isNaN(fecha.getTime()) && Number(campos[0]) == fecha.getDate() && Number(campos[1]) == fecha.getMonth() + 1 && Number(campos[2]) == fecha.getFullYear() && fecha.getTime() >= fechaHoy.getTime()) {
                return null;
            } else {
                return {fecha: true}
            }
        } else {
            return null;
        }
    }

    static pais(control: AbstractControl) : ValidationErrors| null {
        if(control.parent?.get('pais')?.value == "extranjero"){
            if(control.value.length >= 2 && control.value.length <= 50){
                return null;
            } else {
                return {pais:true};
            }
        } else {
            return null;
        }
    }


    static origen(control: AbstractControl) : ValidationErrors| null {
        if(control.parent?.get('cliente')?.value == true){
            if(control.value != "-"){
                return null;
            } else {
                return {origen:true};
            }
        } 
        return null;
    }

}