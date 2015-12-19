import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";
import { NgFor } from 'angular2/common';

@Component({
  selector: 'hello-world',
  template: `
  <div>
    <ul>
      <li *ngFor="#name of names">Hello {{name}}</li>
    </ul>
  </div>
  `
})

class HelloWorld {
  names: string[];
  
  constructor(){
    this.names = ['Flavia', 'Steph', 'Marcus'];
  }
}

bootstrap(HelloWorld);
