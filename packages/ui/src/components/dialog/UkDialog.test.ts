import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import UkDialog from "./UkDialog.vue";

function mountDialog(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(UkDialog, {
    attachTo: document.body,
    props: {
      title: "Delete project",
      open: false,
      "onUpdate:open": (value: boolean) => wrapper.setProps({ open: value }),
      ...props,
    },
    slots: { default: "<p>This cannot be undone.</p>", ...slots },
  });
  return wrapper;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("UkDialog", () => {
  it("is closed by default and opens when v-model:open becomes true", async () => {
    const wrapper = mountDialog();
    const dialog = wrapper.get("dialog").element as HTMLDialogElement;
    expect(dialog.open).toBe(false);

    await wrapper.setProps({ open: true });
    expect(dialog.open).toBe(true);
  });

  it("opens immediately when mounted open", () => {
    const wrapper = mountDialog({ open: true });
    expect((wrapper.get("dialog").element as HTMLDialogElement).open).toBe(true);
  });

  it("is labelled by its title and described by its description", () => {
    const wrapper = mountDialog({ description: "The project and its data will be removed." });
    const dialog = wrapper.get("dialog");
    expect(wrapper.get(`#${dialog.attributes("aria-labelledby")}`).text()).toBe("Delete project");
    expect(wrapper.get(`#${dialog.attributes("aria-describedby")}`).text()).toBe("The project and its data will be removed.");
  });

  it("closes from the close button and updates v-model", async () => {
    const wrapper = mountDialog({ open: true });
    await wrapper.get('button[aria-label="Close"]').trigger("click");

    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
    expect((wrapper.get("dialog").element as HTMLDialogElement).open).toBe(false);
  });

  it("syncs v-model when the browser closes it (Escape)", async () => {
    const wrapper = mountDialog({ open: true });
    (wrapper.get("dialog").element as HTMLDialogElement).close();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
  });

  it("closes on backdrop click but not on clicks inside the panel", async () => {
    const wrapper = mountDialog({ open: true });

    await wrapper.get(".uk-dialog__body").trigger("click");
    expect(wrapper.emitted("update:open")).toBeUndefined();

    await wrapper.get("dialog").trigger("click");
    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
  });

  it("can ignore backdrop clicks", async () => {
    const wrapper = mountDialog({ open: true, closeOnBackdrop: false });
    await wrapper.get("dialog").trigger("click");
    expect(wrapper.emitted("update:open")).toBeUndefined();
  });

  it("passes a close function to the footer slot", async () => {
    const wrapper = mountDialog(
      { open: true },
      { footer: '<template #footer="{ close }"><button class="cancel" @click="close">Cancel</button></template>' },
    );
    await wrapper.get(".cancel").trigger("click");
    expect(wrapper.emitted("update:open")?.at(-1)).toEqual([false]);
  });
});
