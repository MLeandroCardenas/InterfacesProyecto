import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-confirmacion-registro',
  templateUrl: './confirmacion-registro.component.html',
  styleUrls: ['./confirmacion-registro.component.css']
})
export class ConfirmacionRegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private nombreUsuario: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.nombreUsuario = params['usuario'];
    });
  }

}
