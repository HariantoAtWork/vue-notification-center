<template>
  <div
    class="notification relative flex flex-col"
    :class="addClasses"
    @click="onClose"
    v-inject-elements="notification.elements"
  >
    <header class="notification__header absolute top-0 right-0">
      <button
        v-if="notification?.showCloseButton"
        class="notification__close-button"
        :class="{
          'cursor-not-allowed': notification.disableClose,
          'cursor-pointer': !notification.disableClose,
        }"
        @click.stop="onCloseButton"
      >
        <i class="fa-solid fa-xmark" />
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
    <!-- <pre v-text="notification" /> -->
  </div>
</template>

<script>
  import vInjectElements from '../directives/v-inject-elements'
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
          show: true,
        }),
      },
    },
    computed: {
      addClasses() {
        const { type, elementClass = 'notice' } = this.notification
        return `${elementClass} ${elementClass}--${type} ${this.notification.disableClose ? 'cursor-not-allowed' : 'cursor-auto'}`
      },
    },
    // Methods
    methods: {
      // Events
      onDestroy() {
        // console.log('onDestroy')
        return this.notification.destroy()
      },
      onClose() {
        // console.log('click: onClose')
        const { notification } = this
        if (notification.disableClose) return
        if (notification.showCloseButton) return
        if (Array.isArray(notification.elements) && notification.elements.length) return
        this.onDestroy()
      },
      onCloseButton() {
        const { notification } = this
        if (notification.disableClose) return
        this.onDestroy()
      },
    },
  }
</script>

<style scoped lang="scss">
  .cursor {
    &-not-allowed {
      cursor: not-allowed;
    }
    &-pointer {
      cursor: pointer;
    }
    &-auto {
      cursor: auto;
    }
  }
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
