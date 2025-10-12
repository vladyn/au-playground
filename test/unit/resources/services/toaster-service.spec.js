import { ToasterService } from "../../../../src/resources/services/toaster-service";

describe('ToasterService', () => {
  let toasterService;
  let mockRenderer;
  let mockI18n;
  let mockController;

  beforeEach(() => {
    mockRenderer = jest.fn();
    mockI18n = jest.fn();
    mockController = jest.fn();

    toasterService = new ToasterService(mockRenderer, mockI18n, mockController);
  });

  it('should create an instance of ToasterService', () => {
    expect(toasterService).toBeDefined();
  });
  // Add more tests as needed to cover the methods of ToasterService
  describe('showToaster', () => {
    it('should call controller.showToaster with the provided viewModel', () => {
      const viewModel = { title: 'Test', message: 'This is a test' };
      toasterService.controller.showToaster = jest.fn();

      toasterService.showToaster(viewModel);

      expect(toasterService.controller.showToaster).toHaveBeenCalledWith(viewModel);
    });
  });

  describe('hideToaster', () => {
    it('should call controller.hideToaster', () => {
      toasterService.controller.hideToaster = jest.fn();

      toasterService.hideToaster();

      expect(toasterService.controller.hideToaster).toHaveBeenCalled();
    });
  });

  describe('snoozeToaster', () => {
    it('should call controller.snoozeToaster', () => {
      toasterService.controller.snoozeToaster = jest.fn();

      toasterService.snoozeToaster();

      expect(toasterService.controller.snoozeToaster).toHaveBeenCalled();
    });
  });

  describe('toggleToaster', () => {
    it('should call controller.toggleToaster with the provided viewModel', () => {
      const viewModel = { title: 'Test', message: 'This is a test' };
      toasterService.controller.toggleToaster = jest.fn();

      toasterService.toggleToaster(viewModel);

      expect(toasterService.controller.toggleToaster).toHaveBeenCalledWith(viewModel);
    });
  });
});
