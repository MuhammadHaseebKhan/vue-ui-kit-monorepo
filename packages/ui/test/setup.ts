// jsdom does not implement the <dialog> modal API. This mirrors the parts of the spec the
// components rely on: showModal() opens, close() closes and fires a "close" event.
// Real-browser behaviour (focus containment, Escape, top layer) is checked in Storybook.
if (typeof HTMLDialogElement !== "undefined" && !HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    if (this.open) throw new DOMException("Dialog is already open", "InvalidStateError");
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.open) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
