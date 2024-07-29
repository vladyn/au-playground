import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('Tabs', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/tabs/tabs'))
      .inView('<tabs></tabs>');
  });

  it('should render tabs', done => {
    component.create(bootstrap).then(() => {
      const tabsElement = document.querySelector('tabs');
      expect(tabsElement.querySelectorAll('div').length).toBe(2);
      done();
    }).catch(e => { 
      throw e;
    });
  });
});
