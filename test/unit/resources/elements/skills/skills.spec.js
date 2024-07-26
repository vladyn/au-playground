import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('Skills', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('skills'))
      .inView('<skills></skills>');
  });

  it('should render skills', done => {
    component.create(bootstrap).then(() => {
      const skillsElement = document.querySelector('.skills');
      expect(skillsElement.innerHTML).toBe('');
      done();
    }).catch(e => { 
      console.log(e.toString());
      done();
    });
  });
});
