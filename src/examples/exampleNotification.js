import Vue from 'vue';
import notificationCenter from '@observables/notificationCenter';
import deepmerge from '@helpers/deepmerge';
import NotificationTypes from '../components/NotificationTypes';

const {
  methods: { addNotification },
  notificationPosition,
  notificationType,
} = notificationCenter;

const capitalize = s => {
  if (typeof s !== 'string') return '';
  s = (' ' + s).slice(1);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Factory: createExampleTypeMethods
const createExampleTypeMethods = typesObject => {
  const methods = {};

  Object.values(typesObject).forEach(value => {
    methods['exampleType' + capitalize(value)] = (notification = {}) => {
      return addNotification(
        deepmerge(
          {
            title: capitalize(value),
            type: value,
          },
          notification
        )
      );
    };
  });
  return methods;
};
// Factory: createExamplePositionMethods
const createExamplePositionMethods = typesObject => {
  const methods = {};
  Object.values(typesObject).forEach(value => {
    methods['examplePosition' + capitalize(value)] = (notification = {}) => {
      return addNotification(
        deepmerge(
          {
            title: value.toUpperCase(),
            position: value,
          },
          notification
        )
      );
    };
  });
  return methods;
};

const methods = {
  ...createExampleTypeMethods(notificationType),
  ...createExamplePositionMethods(notificationPosition),
  exampleTypes(notification = {}) {
    Object.values(createExampleTypeMethods(notificationType)).forEach(fn =>
      fn(
        deepmerge(
          {
            options: {
              timeDuration: null,
            },
          },
          notification
        )
      )
    );
  },
  examplePositions(notification = {}) {
    Object.values(createExamplePositionMethods(notificationPosition)).forEach(
      fn =>
        fn(
          deepmerge(
            {
              options: {
                timeDuration: null,
              },
            },
            notification
          )
        )
    );
  },
  extendedTypes({ type, title, message }) {
    const ExtendedVue = Vue.extend(NotificationTypes);
    const vm = new ExtendedVue({
      propsData: {
        type,
        title,
        message,
      },
    }).$mount();
    return vm;
  },
  pushNotice(type, notification = {}) {
    const { title, message } = notification;
    delete notification.title;
    delete notification.message;

    const vmTypes = this.extendedTypes({ type, title, message });
    vmTypes.$on('decline', () => {
      notice.destroy();
    });
    const notice = addNotification(
      deepmerge(
        {
          elements: [vmTypes.$el],
          options: {
            timeDuration: null,
            elementClass: 'notification--notice',
          },
        },
        notification,
        {
          type,
        }
      )
    );
    return notice;
  },
};

export default methods;

setTimeout(() => {
  methods.examplePositions({
    options: {
      showCloseButton: true,
    },
  });
  ['default', 'info', 'danger', 'loading', 'success'].forEach(type => {
    methods.pushNotice(type, {
      title: type,
      message:
        type === 'danger'
          ? 'Push your water glass on the floor commence midnight zoomies, find something else more interesting. Drool sugar, my siamese, stalks me (in a good way), day and night found somthing move i bite it tail.'
          : null,
      options: {
        showCloseButton: true,
      },
    });
  });
}, 2e3);
window.exampleNotification = methods;
