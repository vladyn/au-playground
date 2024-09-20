import {bindable, inject} from 'aurelia-framework';
import { Solar } from '../../../lib/third-parties/learning-hub/solar.js';

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

  attached() {
    this.element.appendChild(this.solar.render());
  }
}
