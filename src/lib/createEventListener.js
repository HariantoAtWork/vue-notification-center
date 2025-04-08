// Factory: createEventListener
const createEventListener = function() {
  // Factory: createEvent
  const createEvent = name => {
    const state = {
      name,
      callbacks: [],
    };
    
    const methods = {
      registerCallback(cb) {
        state.callbacks.push(cb);
      },
      unregisterCallback(cb) {
        const { callbacks } = state;
        const foundIndex = callbacks.findIndex(i => i === cb);
        if (foundIndex > -1) callbacks.splice(foundIndex, 1);
      },
      destroy() {
        const { callbacks } = state;
        callbacks.splice(0, callbacks.length);
      },
    };
    
    return {
      ...state,
      ...methods,
    };
  };
  
  const state = {
    events: {},
  };
  
  const methods = {
    registerEvent(eventName) {
      state.events[eventName] = createEvent(eventName);
    },
    dispatchEvent(eventName, eventArgs) {
      state.events[eventName].callbacks.forEach(cb => cb(eventArgs));
    },
    addEventListener(eventName, cb) {
      state.events[eventName].registerCallback(cb);
    },
    removeEventListener(eventName, cb) {
      state.events[eventName].unregisterCallback(cb);
    },
    destroy() {
      Object.values(state.events).forEach(event => {
        event.destroy();
      });
    },
  };
  
  return {
    ...state,
    ...methods,
  };
};

export default createEventListener;
