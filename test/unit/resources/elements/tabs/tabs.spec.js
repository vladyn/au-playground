import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('Tabs', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/tabs'))
      .inView('<tabs></tabs>');
  });

  it('should render tabs', done => {
    component.create(bootstrap).then(() => {
      const tabsElement = document.querySelector('.tabs');
      expect(tabsElement.innerHTML).toBe('');
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
