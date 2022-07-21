import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  registerForm: FormGroup;

  inputNombre: string | null = null;
  inputClave: string | null = null;
  inputRuc: string | null = null;
  inputCorreo: string | null = null;
  inputTelefono: number | null = null;
  inputTipo: string = 'Seleccione una opcion';
  errorCrearUsuario: boolean = false;

  constructor(private fb:FormBuilder, private route: Router, private _usuarioService: UsuarioService) {
    this.registerForm = this.fb.group({
      nombre: ['',Validators.required],
      password: ['',Validators.required],
      tipo:['', Validators.required],
      email: ['', Validators.required],
      dni: ['',Validators.required],
      telefono: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.inputTipo = 'Seleccione una opcion';
  }

  crearUsuario() {
    this.errorCrearUsuario = false;
    this.inputNombre = this.registerForm.get('nombre')?.value;
    this.inputClave = this.registerForm.get('password')?.value;
    this.inputRuc = this.registerForm.get('dni')?.value;
    this.inputCorreo = this.registerForm.get('email')?.value;
    this.inputTelefono = this.registerForm.get('telefono')?.value;
    this.inputTipo = this.registerForm.get('tipo')?.value;

    if (this.inputNombre != null && this.inputClave != null && this.inputRuc != null && this.inputCorreo != null && this.inputTelefono != null) {
      const usuario = { 'nombre': this.inputNombre, 'tipo': this.inputTipo, 'clave': this.inputClave, 'ruc': this.inputRuc, 'correo': this.inputCorreo, 'telefono': this.inputTelefono }
      this._usuarioService.crearUsuario(usuario).subscribe(
        data => {
          this.route.navigate(['']);
        },
        error => {
          this.errorCrearUsuario = true;
        }
      )
    }

  }
  focoInput(event: any){
    //parentNode o parentElement
    let parent = <HTMLElement>event.target.parentElement.parentElement;
    parent.classList.add("focus");
  }
  nofocoInput(event: any){
    let parent = <HTMLElement>event.target.parentElement.parentElement;
    if(event.target.value == ""){
      parent.classList.remove("focus");
    }
  }
}
