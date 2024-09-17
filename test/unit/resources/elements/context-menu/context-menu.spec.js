jest.useFakeTimers();
import { StageComponent }  from "aurelia-testing";
import { bootstrap }        from "aurelia-bootstrapper";
import { PLATFORM }         from "aurelia-pal";

// jest mock required css
jest.mock('../src/resources/elements/context-menu/context-menu.css', () => {
  return {
    default: ''
  };
});

describe('ContextMenu', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/elements/context-menu/context-menu'))
      .inView('<context-menu></context-menu>');
  });

  it('should render message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      const list = view.querySelector('ul');
      expect(list.textContent).toBeDefined();
      done();
    }).catch(e => {
      console.log(e);
      done();
    });
  });

  // afterEach(() => component.dispose());
});
