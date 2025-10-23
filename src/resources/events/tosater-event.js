export class ShowToasterEvent {}

export class CloseToasterEvent {
  constructor(model) {
    this.dialogId = model.dialogId;
  }
}
