import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.css']
})

export class ConectarComponent implements OnInit {
  loginForm: FormGroup;

  /*
  inputCorreo: string | null = null;
  inputClave: string | null = null;*/
  noEncontro: boolean = false;
  
  constructor(private fb:FormBuilder,private router: Router, private _conexionservice: ConexionService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  conectar() {
    this.noEncontro=false
    if (this.loginForm.get('email')?.value != null && this.loginForm.get('password')?.value != null)
      this._conexionservice.verificarUsuario(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
        data => {
          this.router.navigate(['vista-usuario/' + data.ruc]);       
        },
        error => {
          this.noEncontro = true
        }
      )

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

