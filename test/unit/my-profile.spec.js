import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MyProfile', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('my-profile'))
      .inView('<my-profile first-name.bind="Bob" last-name.bind="Brown"></my-profile>')
      .boundTo({ firstName: 'Bob' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const firstNameElement = document.querySelector('.firstName');
      console.log(component.element.querySelector('.firstName'))
      expect(firstNameElement.innerHTML).toBe('Bob');
      const lastNameElement = document.querySelector('.lastName');
      expect(lastNameElement.innerHTML).toBe('Brown');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});
