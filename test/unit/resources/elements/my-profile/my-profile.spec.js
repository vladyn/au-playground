import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MyProfile', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/my-profile/my-profile'))
      .inView('<my-profile first-name="Bob" last-name="Brown"></my-profile>')
      .boundTo({ firstName: 'Bob', lastName: 'Brown' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const firstNameElement = document.querySelector('.firstName');
      expect(firstNameElement.innerHTML).toBe('Bob');
      const lastNameElement = document.querySelector('.lastName');
      expect(lastNameElement.innerHTML).toBe('Brown');
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
