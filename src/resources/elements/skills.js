import {bindable, inject} from 'aurelia-framework';
import { Solar } from '../../lib/third-parties/learning-hub/solar.js';

@inject(Element)
export class Skills {
  @bindable value = 'Skills';
  message = 'Skills';

  constructor(element) {
    this.solar = new Solar({status: 'loading'});
    this.element = element;
  }

  valueChanged(newValue, oldValue) {
    console.log('valueChanged', newValue, oldValue);
  }

  // This is a lifecycle method that is called when the component is created
  created(owningView, myView) {
    console.log('created');
  }

  attached() {
    console.log('attached');
    console.log(this.element);
  }

  bind(bindingContext, overrideContext) {
    console.log('bound');
    this.message = this.solar.message;
    this.value = this.solar.message + ' bound';
    this.element.appendChild(this.solar.render());
  }

  // This is a lifecycle method that is called when the component is destroyed
  unbind() {
    console.log('unbind');
  }
}
