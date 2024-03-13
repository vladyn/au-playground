import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('AccountDetails', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('account-details'))
      .inView('<account-details></account-details>')
      .boundTo({ firstName: 'Bob', lastName: 'Brown' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const firstNameElement = document.querySelector('.accountDetails');
      expect(firstNameElement.innerHTML).toBe('No details yet.');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});
