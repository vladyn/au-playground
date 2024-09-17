import {bindable, customElement} from 'aurelia-framework';

@customElement('my-profile')
export class Profile {
  @bindable firstName;
  @bindable lastName;
}
