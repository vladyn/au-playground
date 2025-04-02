import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent, ComponentTester} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage App Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('app'))
      .inView('<app></app>');
  });

  it('should render message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      const heading = view.querySelector('h1');
      expect(heading.textContent).toBe('Hello World!');
      done();
    }).catch(e => {
      console.log(e);
      done();
    });
  });
});
