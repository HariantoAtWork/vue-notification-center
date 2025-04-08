<template>
  <div>
    <NotificationCenter :echo-notifications="filteredNotifications" />
    <AlertCenter />
  </div>
</template>
<script>
import NotificationCenter from './components/NotificationCenter';
import AlertCenter from './components/AlertCenter';
import notificationHelper from '@helpers/notification';
import { isMobile } from '@helpers/utility';

export default {
  components: {
    AlertCenter,
    NotificationCenter,
  },
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
    userGroupIds: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    laravelEchoChannels: [],
  }),
  computed: {
    filteredNotifications() {
      return this.notifications.filter(notification =>
        notification.platform == 'all' || (notification.platform == 'mobile' ? isMobile() : !isMobile())
      );
    },
  },
  mounted() {
    const notificationChannel = window.Echo.channel('notification').listen(
      '.notification.push',
      notificationHelper.echoUserNotification
    );
    this.addEchoChannels('.notification.push', notificationChannel);

    this.userGroupIds.map(groupId => {
      const channel = window.Echo.channel(`user-group-notification-${groupId}`).listen(
        '.notification.push',
        notificationHelper.echoUserNotification
      );
      this.addEchoChannels('.notification.push', channel);
    });

  },
  beforeDestroy() {
    this.laravelEchoChannels.map(channel => {
      channel.subscription.unbind(
        channel.eventFormatter.format(channel.format),
        notificationHelper.echoUserNotification
      );
    });
  },
  methods: {
    addEchoChannels(format, channel) {
      this.laravelEchoChannels.push({ format, channel });
    },
  },
};
</script>
