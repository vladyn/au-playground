// mock the ViewSlot
export class AureliaViewSlotMock {
  add = jest.fn();
  removeAll = jest.fn();
  bind = jest.fn();
  attached = jest.fn();
  detach = jest.fn();
  unbind = jest.fn();
  remove = jest.fn();
  insert = jest.fn();
  moveToFront = jest.fn();
  moveToEnd = jest.fn();
  removeAt = jest.fn();
}
