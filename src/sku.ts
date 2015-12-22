import {Component, View} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, Control} from "angular2/common";

@Component({
  selector: 'sku',
  directives: [FORM_DIRECTIVES],
  template: `
  <div>
    <form #f="ngForm" (submit)="onSubmit(f.value)">
      <label for="skuInput">Sku:</label>
      <input type="text"
             id="skuInput"
             placeholder="Enter the SKU"
             ng-control="sku">
      <button type="submit">Submit</button>
    </form>
  </div>
  `
})


export class Sku{
  onSubmit(form){
    console.log(form);

  }
}
