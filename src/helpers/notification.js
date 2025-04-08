import Vue from 'vue';
import notificationCenter from '@observables/notificationCenter';
import deepmerge from '@helpers/deepmerge';
import NotificationTypes from '@entries/notification-center/components/NotificationTypes';
import store from '@store';
import { isMobile } from '@helpers/utility';

const addNotification = notificationCenter.methods.addNotification;

const extendedTypes = ({ type, title, message }) => {
  const ExtendedVue = Vue.extend(NotificationTypes);
  const vm = new ExtendedVue({
    propsData: {
      type,
      title,
      message,
    },
  }).$mount();
  return vm;
};

const notification = {
  pushEmergencyNotification(notification = {}) {
    const { title, message, type } = notification;
    delete notification.title;
    delete notification.message;

    const vmTypes = extendedTypes({ type, title, message });
    const notice = addNotification(
      deepmerge(
        {
          elements: [vmTypes.$el],
          options: {
            timeDuration: null,
            elementClass: 'notification--notice',
            showCloseButton: true,
          },
        },
        notification
      )
    );
    return notice;
  },
  pushNotification(notification = {}) {
    const { title, message, type } = notification;
    delete notification.title;
    delete notification.message;

    const vmTypes = extendedTypes({ type, title, message });
    const notice = addNotification(
      deepmerge(
        {
          elements: [vmTypes.$el],
        },
        notification
      )
    );
    return notice;
  },
  echoUserNotification(data) {
    const { user } = store.state.profile,
      { title, message, type, user_id, is_push, is_alert, autohide, hide_after, platform } = data;

    if((platform == 'mobile' && !isMobile()) || (platform == 'desktop' && isMobile()))
      return;

    if (user.id === user_id || !user_id)
      if (is_push === 1 && is_alert === 1) {
        if(window.squaresData.user)
          notification.pushEmergencyNotification({
            title,
            message,
            type,
            options: {
              showCloseButton: true,
            },
            meta: {
              displayOnAlertCenterOnly: true,
            },
          });
      } else if (is_push === 1 && is_alert === 0) {
        if(window.squaresData.user)
          notification.pushNotification({
            title,
            message,
            type,
            options: {
              timeDuration: autohide ? hide_after : null,
              showCloseButton: true,
            },
          });
      } else {
        notification.pushNotification({
          title,
          message,
          type,
          options: {
            timeDuration: autohide ? hide_after : null,
            showCloseButton: true,
          },
        });
      }
  },
};

export default notification;
// window.helperNotification = notification;
