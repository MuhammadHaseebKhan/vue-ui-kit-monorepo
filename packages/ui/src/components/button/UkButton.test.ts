import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UkButton from "./UkButton.vue";

describe("UkButton", () => {
  it("renders the label and defaults to a non-submitting primary button", () => {
    const wrapper = mount(UkButton, { slots: { default: "Save" } });
    const button = wrapper.get("button");

    expect(button.text()).toBe("Save");
    expect(button.attributes("type")).toBe("button");
    expect(button.classes()).toEqual(expect.arrayContaining(["uk-button--primary", "uk-button--md"]));
  });

  it("applies variant, size and block modifiers", () => {
    const wrapper = mount(UkButton, { props: { variant: "danger", size: "lg", block: true }, slots: { default: "Delete" } });
    expect(wrapper.get("button").classes()).toEqual(
      expect.arrayContaining(["uk-button--danger", "uk-button--lg", "uk-button--block"]),
    );
  });

  it("emits click when enabled", async () => {
    const wrapper = mount(UkButton, { slots: { default: "Go" } });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("does not emit click when disabled", async () => {
    const wrapper = mount(UkButton, { props: { disabled: true }, slots: { default: "Go" } });
    expect(wrapper.get("button").attributes()).toHaveProperty("disabled");
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("stays focusable but blocks clicks while loading", async () => {
    const wrapper = mount(UkButton, { props: { loading: true }, slots: { default: "Saving" } });
    const button = wrapper.get("button");

    expect(button.attributes()).not.toHaveProperty("disabled");
    expect(button.attributes("aria-busy")).toBe("true");
    expect(button.attributes("aria-disabled")).toBe("true");
    expect(wrapper.find(".uk-button__spinner").exists()).toBe(true);

    await button.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  it("renders start and end slots as decorative icons", () => {
    const wrapper = mount(UkButton, { slots: { default: "Next", start: "<svg />", end: "<svg />" } });
    const icons = wrapper.findAll(".uk-button__icon");
    expect(icons).toHaveLength(2);
    icons.forEach((icon) => expect(icon.attributes("aria-hidden")).toBe("true"));
  });

  it("can submit a form when asked to", () => {
    const wrapper = mount(UkButton, { props: { type: "submit" }, slots: { default: "Send" } });
    expect(wrapper.get("button").attributes("type")).toBe("submit");
  });

  it("passes through native attributes", () => {
    const wrapper = mount(UkButton, { attrs: { "aria-label": "Close dialog", "data-test": "x" }, slots: { default: "×" } });
    expect(wrapper.get("button").attributes()).toMatchObject({ "aria-label": "Close dialog", "data-test": "x" });
  });
});
