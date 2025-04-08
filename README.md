# Vue Notification Center

A flexible and feature-rich notification system for Vue.js applications. This library provides a simple way to manage and display notifications with various customisation options.

## Features

- 🎯 Multiple notification types (default, info, success, warning, danger, error)
- 📍 Customisable notification positions (top/bottom - left/center/right)
- ⏱️ Configurable duration and timing
- 🎨 Customisable styling through CSS classes
- 🔄 Reactive state management
- 🎮 Event-driven architecture
- 📦 Lightweight and easy to integrate

## Installation

```bash
npm install vue-notification-center
# or
yarn add vue-notification-center
```

## Usage

### Basic Setup

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import NotificationCenter from 'vue-notification-center'

const app = createApp(App)
app.use(NotificationCenter)
app.mount('#app')
```

### Add the Component

```vue
<template>
  <NotificationCenter />
</template>
```

### Show Notifications

```javascript
// Using the global method
this.$notify({
  title: 'Success!',
  message: 'Operation completed successfully',
  type: 'success',
  position: 'topRight',
  options: {
    timeDuration: 3000, // 3 seconds
    canClose: true
  }
})

// Using the provide/inject API
const { nc } = inject('nc')
nc.addNotification({
  title: 'Info',
  message: 'This is an info message',
  type: 'info'
})
```

## Configuration Options

### Notification Types
- `default`
- `info`
- `success`
- `warning`
- `danger`
- `error`

### Positions
- `topLeft`
- `topCenter`
- `topRight`
- `bottomLeft`
- `bottomCenter`
- `bottomRight`

### Default Notification Object
```javascript
{
  uuid: string,          // Automatically generated
  title: string,         // Notification title
  message: string,       // Notification message
  elements: array,       // Custom elements
  type: string,          // Notification type
  position: string,      // Position
  options: {
    show: boolean,       // Visibility state
    canClose: boolean,   // Allow closing
    showCloseButton: boolean,
    timeStart: Date,     // Start time
    timeDuration: number,// Duration in milliseconds
    elementClass: string // Custom CSS class
  },
  meta: object          // Additional metadata
}
```

## Methods

### Notification Center
- `addNotification(notification)`: Add a new notification
- `removeNotification(notification)`: Remove a specific notification
- `removeNotificationByUuid(uuid)`: Remove notification by UUID
- `removeNotifications()`: Remove all notifications

### Individual Notification
- `toggleVisibility()`: Toggle notification visibility
- `hide()`: Hide the notification
- `destroy()`: Remove the notification
- `$on(event, callback)`: Subscribe to events
- `$off(event, callback)`: Unsubscribe from events
- `$emit(event, data)`: Emit events

## Events

- `destroy`: Emitted when a notification is destroyed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
