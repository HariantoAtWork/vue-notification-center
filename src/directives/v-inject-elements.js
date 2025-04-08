import Vue from 'vue';

export default {
  inserted(el, binding) {
    const { value: elements } = binding;
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        el.appendChild(element.cloneNode(true));
      } else {
        const ExtendedVue = Vue.extend(element);
        const component = new ExtendedVue().$mount();
        el.appendChild(component.$el);
      }
    });
  },
};
