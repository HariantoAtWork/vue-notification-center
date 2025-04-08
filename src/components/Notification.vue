<template>
  <div
    v-inject-elements="notification.elements"
    class="notification relative flex flex-col"
    :class="addClasses"
    @click="onClose"
  >
    <header class="notification__header absolute top-0 right-0">
      <button
        v-if="notification.options.showCloseButton && notification.options.closable"
        class="notification__close-button"
        @click="onDestroy"
      >
        <i
          class="material-icons u-events--none"
          aria-hidden="true"
        >close</i>
      </button>
    </header>
    <h1
      v-if="notification.title"
      class="notification__title"
      v-text="notification.title"
    />
    <p
      v-if="notification.message"
      class="notification__message"
      v-text="notification.message"
    />
  </div>
</template>

<script>
import vInjectElements from '../directives/v-inject-elements';
export default {
  name: 'NotificationCenterNotice',
  directives: {
    injectElements: vInjectElements,
  },
  props: {
    notification: {
      required: true,
      type: Object,
      default: () => ({
        options: {
          show: true,
        },
      }),
    },
  },
  computed: {
    addClasses() {
      const {
        type,
        options: { elementClass },
      } = this.notification;
      return `${elementClass} notification--${type}`;
    },
  },
  // Methods
  methods: {
    // Events
    onDestroy() {
      if (this.notification.options.closable)
        return this.notification.destroy();
    },
    onClose() {
      const { notification } = this;
      if (
        !(
          notification.options.showCloseButton ||
          notification.elements.length > 0 ||
          !notification.options.closable
        )
      ) {
        this.onDestroy();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.top-0 {
  top: 0;
}
.right-0 {
  right: 0;
}
.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}

.u-events {
  &--none {
    pointer-events: none;
  }
  &--all {
    pointer-events: all;
  }
}
</style>
