import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('Tabs', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/tabs/tabs'))
      .inView('<tabs></tabs>')
      
  });

  it('should render tabs', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      const tabsElement = element.querySelector('tabs');
      expect(tabsElement).toBeTruthy();
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
