import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import UkTextField from "./UkTextField.vue";

describe("UkTextField", () => {
  it("associates the label with the input", () => {
    const wrapper = mount(UkTextField, { props: { label: "Email" } });
    const input = wrapper.get("input");
    expect(wrapper.get("label").attributes("for")).toBe(input.attributes("id"));
    expect(wrapper.get("label").text()).toBe("Email");
  });

  it("supports v-model", async () => {
    const wrapper = mount(UkTextField, {
      props: { label: "Name", modelValue: "Ada", "onUpdate:modelValue": (value: string) => wrapper.setProps({ modelValue: value }) },
    });
    const input = wrapper.get("input");
    expect(input.element.value).toBe("Ada");

    await input.setValue("Grace");
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["Grace"]);
    expect(wrapper.props("modelValue")).toBe("Grace");
  });

  it("links the hint through aria-describedby", () => {
    const wrapper = mount(UkTextField, { props: { label: "Password", hint: "At least 12 characters" } });
    const hintId = wrapper.get(".uk-field__hint").attributes("id");
    expect(wrapper.get("input").attributes("aria-describedby")).toBe(hintId);
    expect(wrapper.get("input").attributes()).not.toHaveProperty("aria-invalid");
  });

  it("marks the field invalid and announces the error before the hint", () => {
    const wrapper = mount(UkTextField, { props: { label: "Email", hint: "Work address", error: "Enter a valid email" } });
    const input = wrapper.get("input");
    const errorId = wrapper.get(".uk-field__error").attributes("id");
    const hintId = wrapper.get(".uk-field__hint").attributes("id");

    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe(`${errorId} ${hintId}`);
  });

  it("gives every instance a unique id", () => {
    const wrapper = mount({
      components: { UkTextField },
      template: '<UkTextField label="First" /><UkTextField label="Second" />',
    });
    const [first, second] = wrapper.findAll("input");
    expect(first?.attributes("id")).not.toBe(second?.attributes("id"));
  });

  it("forwards native attributes to the input, not the wrapper", () => {
    const wrapper = mount(UkTextField, { props: { label: "Phone", type: "tel" }, attrs: { autocomplete: "tel", placeholder: "+44" } });
    expect(wrapper.get("input").attributes()).toMatchObject({ type: "tel", autocomplete: "tel", placeholder: "+44" });
    expect(wrapper.get(".uk-field").attributes()).not.toHaveProperty("autocomplete");
  });

  it("marks required fields visually and natively", () => {
    const wrapper = mount(UkTextField, { props: { label: "Name", required: true } });
    expect(wrapper.get("input").attributes()).toHaveProperty("required");
    expect(wrapper.get(".uk-field__required").attributes("aria-hidden")).toBe("true");
  });
});
