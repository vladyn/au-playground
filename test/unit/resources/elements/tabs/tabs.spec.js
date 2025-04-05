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
    const result = component.create(bootstrap)
    .then((res) => {
      console.log(res)
      console.log(result);
      done();
    })
  });
});
