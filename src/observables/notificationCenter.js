import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';

import deepmerge from '../lib/deepmerge';
import dayjs from '../lib/dayjs';
import createTimer from '../lib/createTimer'
import createEventListener from '../lib/createEventListener'

// #region notificationType
const notificationType = Object.freeze({
  DEFAULT: 'default',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  ERROR: 'error',
});
// #endregion notificationType

// #region notificationPosition
const notificationPosition = Object.freeze({
  TOPLEFT: 'topLeft',
  TOPCENTER: 'topCenter',
  TOPRIGHT: 'topRight',
  BOTTOMLEFT: 'bottomLeft',
  BOTTOMCENTER: 'bottomCenter',
  BOTTOMRIGHT: 'bottomRight',
});
// #endregion notificationPosition

// #region defaultNotification
// Default Settings for Notification
const defaultNotification = {
  title: null,
  message: null,
  elements: [],
  type: notificationType.DEFAULT,
  position: notificationPosition.BOTTOMLEFT,
  options: {
    show: false,
    closable: true,
    showCloseButton: false,
    timeStart: null, // Date object
    timeDuration: 3e3,
    elementClass: '', // Append CSS class name in the element, ex: `notification--notify`
  },
  meta: {}, // Empty Object: pass any property values
};
// #endregion defaultNotification

// Class: Notification
// notification Object (look: defaultNotification)
const Notification = function(notification) {
  notification = deepmerge(
    { uuid: uuidv4() },
    defaultNotification,
    notification,
    {
      type: Object.values(notificationType).includes(notification.type)
        ? notification.type
        : notificationType.DEFAULT,
      position: Object.values(notificationPosition).includes(
        notification.position
      )
        ? notification.position
        : notificationPosition.BOTTOMLEFT,
    }
  );

  const event = createEventListener(),
    { addEventListener, removeEventListener } = event;
  event.registerEvent('destroy');

  let timerId = null;

  const now = new Date(),
    { options } = notification,
    timeStart = options.timeStart ? options.timeStart : now;

  const timer = createTimer({
    timeStart,
    timeDuration: options.timeDuration,
    onStartTimer() {
      // console.log('started!', notification.uuid);
      options.show = true;
    },
    onEndTimer() {
      // console.log('ended!', notification.uuid);
      if (options.timeDuration) actions.destroy();
    },
  });

  if (
    dayjs(now).isBetween(
      timeStart,
      dayjs(timeStart).add(options.timeDuration, 'millisecond'),
      null,
      '[]'
    )
  ) {
    timer.startTimer();
  } else if (dayjs(now).isSameOrBefore(timeStart)) {
    // console.log('Future!', notification.uuid);
    const timeDiff = timeStart.getTime() - now.getTime();
    timerId = setTimeout(timer.startTimer, timeDiff);
  } else {
    // console.log(notification.uuid, '-- already ended');
  }

  const actions = {
    toggleVisibility() {
      options.show = !options.show;
    },
    hide() {
      options.show = false;
    },
    destroy() {
      actions.destroyEvents();
      methods.removeNotification(notification);
    },
    destroyEvents() {
      clearTimeout(timerId);
      timer.stopTimer();
      event.dispatchEvent('destroy', { notification });
      event.destroy();
      if (typeof notification.onDestroy === 'function')
        notification.onDestroy();
    },
  };

  Object.assign(this, notification, actions, {
    addEventListener,
    removeEventListener,
  });
};

// STORE: state
const state = Vue.observable({
  notifications: [],
});
// STORE: methods
const methods = {
  addNotification(notification) {
    const notice = new Notification(notification);
    state.notifications.unshift(notice);
    return notice;
  },
  removeNotification(notification) {
    return methods.removeNotificationByUuid(notification.uuid);
  },
  removeNotificationByUuid(uuid) {
    const { notifications } = state;
    const foundIndex = notifications.findIndex(
      notification => notification.uuid === uuid
    );
    if (foundIndex > -1) return notifications.splice(foundIndex, 1);
  },
  removeNotifications() {
    const { notifications } = state;
    return notifications.splice(0, notifications.length);
  },
};

export default {
  state,
  methods,
  notificationType,
  notificationPosition,
};

// export { state, methods };

// #region window
// Test: window.notificationCenter
window.notificationCenter = {
  state,
  methods,
  dayjs,
};
// #endregion window
