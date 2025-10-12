import { ToasterRenderer } from "../../../../src/resources/renderers/toaster-renderer";

describe('ToasterRenderer', () => {
  let toasterRenderer;

  beforeEach(() => {
    toasterRenderer = new ToasterRenderer();
  });

  it('should create an instance of ToasterRenderer', () => {
    expect(toasterRenderer).toBeDefined();
  });
  // Add more tests as needed to cover the methods of ToasterRenderer
  it('should have a render method', () => {
    expect(typeof toasterRenderer.render).toBe('function');
  });

  it('should have a closeToaster method', () => {
    toasterRenderer.viewSlot = { removeAll: jest.fn() }; // Mock viewSlot
    toasterRenderer.closeToaster();
    expect(toasterRenderer.viewSlot.removeAll).toHaveBeenCalled();
  });

  it('should have an openToaster method', () => {
    expect(typeof toasterRenderer.openToaster).toBe('function');
  });
});
