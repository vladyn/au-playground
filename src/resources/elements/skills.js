import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class Skills {
  @bindable value = 'Skills';
  message = 'Skills';

  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue, oldValue) {
    console.log('valueChanged', newValue, oldValue);
  }

  attached() {
    // this.element.appendChild();
  }

  bind() {
    this.message = this.value + ' bound';	
    this.value = this.value + ' bound';
  }
}
