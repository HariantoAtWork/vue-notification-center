<template>
  <NotificationCenter />
  <div class="container">
    <h1>Vue Notification Center Test</h1>
    <div class="test-section">
      <h2>Basic Notifications</h2>
      <div class="buttons">
        <button
          class="info"
          @click="showInfo"
          >Show Info</button
        >
        <button
          class="success"
          @click="showSuccess"
          >Show Success</button
        >
        <button
          class="warning"
          @click="showWarning"
          >Show Warning</button
        >
        <button
          class="error"
          @click="showError"
          >Show Error</button
        >
      </div>
    </div>

    <div class="test-section">
      <h2>Custom Duration</h2>
      <div class="buttons">
        <button @click="showCustomDuration(2000)">2 Seconds</button>
        <button @click="showCustomDuration(5000)">5 Seconds</button>
        <button @click="showCustomDuration(0)">No Auto Close</button>
      </div>
    </div>

    <div class="test-section">
      <h2>Custom Position</h2>
      <div class="buttons">
        <button @click="showCustomPosition('topRight')">Top Right</button>
        <button @click="showCustomPosition('topLeft')">Top Left</button>
        <button @click="showCustomPosition('bottomRight')">Bottom Right</button>
        <button @click="showCustomPosition('bottomLeft')">Bottom Left</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import createProxy from '@lib/createProxy'
  import { inject } from 'vue'
  const nc = inject('nc')

  const showInfo = () => {
    nc.addNotification({
      title: 'Info Notification',
      message: 'This is an info notification',
      type: 'info',
      timeDuration: null,
      elementClass: 'notice',
      showCloseButton: true,
      // disableClose: true,
    })
  }

  const showSuccess = () => {
    nc.addNotification({
      title: 'Success Notification',
      message: 'This is a success notification',
      type: 'success',
      timeDuration: null,
      showCloseButton: true,
      elementClass: 'notice',
    })
  }

  const showWarning = () => {
    nc.addNotification({
      title: 'Warning Notification',
      message: 'This is a warning notification',
      type: 'warning',
      timeDuration: null,
      showCloseButton: true,
      elementClass: 'notice',
    })
  }

  const showError = () => {
    nc.addNotification({
      title: 'Error Notification',
      message: 'This is an error notification',
      type: 'error',
      timeDuration: null,
      showCloseButton: true,
      elementClass: 'notice',
      showCloseButton: true,
    })
  }

  const showCustomDuration = duration => {
    nc.addNotification({
      title: 'Custom Duration',
      message: `This notification will ${
        duration === 0 ? 'not auto-close' : `close in ${duration / 1000} seconds`
      }`,
      type: 'info',
      timeDuration: duration,
      showCloseButton: true,
    })
  }

  const showCustomPosition = position => {
    nc.addNotification({
      title: 'Custom Position',
      message: `This notification appears at ${position}`,
      type: 'info',
      position,
    })
  }
</script>

<style scoped lang="scss">
  ::v-deep(.notice) {
    &.notice--info {
      background-color: #3498db;
    }
    &.notice--success {
      background-color: #2ecc71;
    }
    &.notice--warning {
      background-color: #f1c40f;
    }
    &.notice--error {
      background-color: #e74c3c;
    }
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .test-section {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  h2 {
    color: #34495e;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: opacity 0.2s;
  }

  button:hover {
    opacity: 0.9;
  }

  button.info {
    background-color: #3498db;
  }

  button.success {
    background-color: #2ecc71;
  }

  button.warning {
    background-color: #f1c40f;
  }

  button.error {
    background-color: #e74c3c;
  }

  button:not(.info):not(.success):not(.warning):not(.error) {
    background-color: #95a5a6;
  }
</style>
