import {StageComponent, ComponentTester, CompileSpy, ViewSpy} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {PLATFORM} from 'aurelia-pal';

describe('MenuRenderer', () => {
  let renderer;

  beforeEach(() => {
    renderer = StageComponent
      .withResources(PLATFORM.moduleName('../../src/resources/renderers/menu-renderer'))
      .inView('<context-menu></context-menu>');
  });

  it('can manually handle lifecycle', done => {
    let nameElement;

    renderer.manuallyHandleLifecycle().create(bootstrap)
      .then(() => {
        nameElement = document.querySelector('.name');
        expect(nameElement.innerHTML).toBe(' ');
      })
      .then(() => renderer.bind())
      .then(() => {
        expect(nameElement.innerHTML).toBe('Foo bind');
      })
      .then(() => renderer.attached())
      .then(() => {
        expect(nameElement.innerHTML).toBe('Foo attached');
      })
      .then(() => renderer.detached())
      .then(() => renderer.unbind())
      .then(() => {
        expect(renderer.viewModel.name).toBe(null);
      })
      .then(() => renderer.bind({ name: 'Bar' }))
      .then(() => {
        expect(nameElement.innerHTML).toBe('Bar bind');
      })
      .then(() => renderer.attached())
      .then(() => {
        expect(nameElement.innerHTML).toBe('Bar attached');
      })
      .then(done);
  });

  afterEach(() => renderer.dispose());
});
