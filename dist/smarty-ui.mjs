import { defineComponent, createVNode, openBlock, createElementBlock, createTextVNode } from "vue";
const __uno = "";
const props = {
  color: {
    type: String,
    default: "blue"
  },
  icon: {
    type: String,
    default: ""
  }
};
const Button = defineComponent({
  name: "SButton",
  props,
  setup(props2, {
    slots
  }) {
    return () => createVNode("button", {
      "class": `
                    py-2
                    px-4
                    font-semibold
                    rounded-lg
                    shadow-md
                    text-white
                    border-none
                    cursor-pointer
                    m-1
                    bg-${props2.color}-500
                    hover:bg-${props2.color}-700
                `
    }, [props2.icon !== "" ? createVNode("i", {
      "class": `i-ic-baseline-${props2.icon} p-3`
    }, null) : "", slots.default ? slots.default() : ""]);
  }
});
const _sfc_main$1 = {
  name: "SFCButton"
};
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", null, "SFC - button");
}
const SFCButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const JSXButton = defineComponent({
  name: "JSXButton",
  render() {
    return createVNode("button", null, [createTextVNode("JSX button")]);
  }
});
const _sfc_main = defineComponent({
  name: "Effect"
});
const Effect_vue_vue_type_style_index_0_scoped_19ba51e1_lang = "";
const _hoisted_1 = {
  class: "box-hover",
  style: { "width": "200px", "height": "100px", "background": "pink" }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1);
}
const EffectVue = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-19ba51e1"]]);
const entry = {
  install(app) {
    app.component(Button.name, Button);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
    app.component(EffectVue.name, EffectVue);
  }
};
export {
  JSXButton,
  Button as SButton,
  SFCButton,
  entry as default
};
//# sourceMappingURL=smarty-ui.mjs.map
