import Vue from 'vue';
import App from './App';

const app = function() {
  const { notifications, user_group_ids } = window.squaresData;
  new Vue({
    el: '#vueNotificationCenter',
    render: h => h(App,{
      props: {
        notifications,
        userGroupIds: user_group_ids,
      },
    }),
  });
};
export default {
  app,
};
