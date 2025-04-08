<template>
  <div class="notification-types">
    <div class="notification__container">
      <aside
        v-if="!showType('default')"
        class="notification__aside"
        :class="`notification__aside--${type}`"
      >
        <Spinner
          v-if="showType('loading')"
          class="spinner"
          :color="colorSpinner"
        />
        <i
          v-if="showType('success')"
          class="material-icons"
        >check_circle</i>
        <i
          v-if="showType('info')"
          class="material-icons"
        >information</i>
        <i
          v-if="showType('warning') || showType('danger')"
          class="material-icons"
        >warning_outline</i>
      </aside>
      <div
        v-if="title || message"
        class="notification__message-container"
      >
        <h1
          v-if="title"
          class="notification__title"
          v-text="title"
        />
        <div
          v-if="message"
          v-sanitize-html="message"
          class="notification__message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@components/Spinner';
import transMixin from '@mixins/trans';
import sanitizeHtml from '@directives/v-sanitize-html';

export default {
  name: 'NotificationSpinner',
  directives: {
    sanitizeHtml,
  },
  components: {
    Spinner,
  },
  mixins: [transMixin],
  props: {
    type: {
      type: String,
      default: 'default',
    },
    colorSpinner: {
      type: String,
      default: 'black',
    },
    title: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
  methods: {
    showType(type) {
      return this.type === type;
    },
  },
};
</script>
