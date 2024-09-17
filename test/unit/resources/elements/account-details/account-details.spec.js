import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('AccountDetails', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/account-details/account-details'))
      .inView('<account-details></account-details>')
      .boundTo({ firstName: 'Bob', lastName: 'Brown' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const firstNameElement = document.querySelector('.accountDetails');
      const element = component.element;
      const h1 = element.querySelector('h1');
      expect(firstNameElement.innerHTML)
      expect(h1.textContent).toBe('No details yet.');
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
