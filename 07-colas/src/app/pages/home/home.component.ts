import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('container');
  }

  public entrar(numero: Number) {
    if ( !numero) { return; }
    this.router.navigate(['/escritorio', numero]);
  }

}
