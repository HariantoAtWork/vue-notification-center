# Vue Notification Center

A flexible and feature-rich notification system for Vue.js and Nuxt 3 applications. This library provides a simple way to manage and display notifications with various customisation options.

## Version Information

- Vue.js: ^3.0.0 (peer dependency)
- Node.js: >=16.0.0
- PNPM: >=8.0.0

## Features

- 🎯 Multiple notification types (default, info, success, warning, danger, error)
- 📍 Customisable notification positions (top/bottom - left/center/right)
- ⏱️ Configurable duration and timing
- 🎨 Customisable styling through CSS classes
- 🔄 Reactive state management
- 🎮 Event-driven architecture
- 📦 Lightweight and easy to integrate
- ⚡️ Nuxt 3 ready with auto-imports support

## Installation

### Vue 3
```bash
# Using npm
npm install @harianto/vue-notification-center

# Using yarn
yarn add @harianto/vue-notification-center

# Using pnpm
pnpm add @harianto/vue-notification-center
```

### Nuxt 3
```bash
# Using npm
npm install @harianto/vue-notification-center

# Using yarn
yarn add @harianto/vue-notification-center

# Using pnpm
pnpm add @harianto/vue-notification-center
```

## Importing Styles

To use the default styling for notifications, you need to import the CSS file:

### Vue 3
```javascript
// In your main.js or App.vue
import '@harianto/vue-notification-center/dist/style.css'
```

### Nuxt 3
```javascript
// In your nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@harianto/vue-notification-center/dist/style.css'
  ]
})
```

You can also customize the appearance of notifications by overriding the default CSS classes.

## Usage

### Vue 3 Setup

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import NotificationCenter from '@harianto/vue-notification-center'

const app = createApp(App)
app.use(NotificationCenter)
app.mount('#app')
```

### Nuxt 3 Setup

Create a plugin file `plugins/notification-center.client.ts`:
```typescript
import { defineNuxtPlugin } from '#app'
import { plugin } from '@harianto/vue-notification-center'

export default defineNuxtPlugin(nuxtApp => nuxtApp.vueApp.use(plugin))
```

### Add the Component

```vue
<template>
  <NotificationCenter />
</template>
```

### Show Notifications

#### Vue 3
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

#### Nuxt 3
```javascript
// Using the global method (auto-imported)
const { $notify } = useNuxtApp()
$notify({
  title: 'Success!',
  message: 'Operation completed successfully',
  type: 'success'
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

## Custom Elements

The notification center supports various types of custom elements, allowing you to create rich, interactive notifications. Here are examples of how to use custom elements:

### 1. Vue Options API Component

```javascript
// Create a notification with a Vue Options API component
notificationCenter.methods.addNotification({
  elements: [
    {
      template: `Hello {{ text }} world`,
      data: () => ({
        text: 'My'
      })
    }
  ],
  position: 'topRight',
  options: {
    timeDuration: null,
    elementClass: 'notification--notice'
  }
})
```

### 2. HTML Template

```javascript
// Create a notification with an HTML template
const createClonedFromTemplate = () => {
  const template = document.createElement('template')
  template.innerHTML = '<div>Hello <b>bold</b> world <strong>strong</strong></div>'
  return template.content.cloneNode(true)
}

notificationCenter.methods.addNotification({
  elements: [createClonedFromTemplate()],
  position: 'topRight',
  options: {
    timeDuration: null
  }
})
```

### 3. Custom DOM Elements

```javascript
// Create a notification with custom DOM elements
const CustomDOMButton = buttonText => {
  const root = document.createElement('button')
  const textNode = document.createTextNode(buttonText)
  
  root.onclick = event => {
    root.innerHTML = 'Clicked'
    console.log('Button clicked: ' + buttonText)
    notification.destroy()
  }
  
  root.classList.add('btn', 'btn-primary')
  root.appendChild(textNode)
  return root
}

const notification = notificationCenter.methods.addNotification({
  elements: [CustomDOMButton('Click Me')],
  position: 'topRight',
  options: {
    timeDuration: null
  }
})
```

### 4. Vue Component with Proxy

```javascript
// Create a notification with a Vue component using createProxy
import { createProxy } from '@harianto/vue-notification-center/lib/createProxy'

const proxy = createProxy({
  data: () => ({
    text: 'Proxy'
  }),
  template: `As the world {{text}} turns<button @click="onDestroy">Destroy</button>`,
  methods: {
    onDestroy() {
      if (typeof this.destroy === 'function') this.destroy()
    }
  }
})
proxy.destroy = () => {
  notification.destroy()
}

const notification = notificationCenter.methods.addNotification({
  elements: [proxy.$el],
  position: 'topRight',
  options: {
    timeDuration: null
  }
})
```

### 5. Combining Multiple Elements

You can combine multiple element types in a single notification:

```javascript
const notification = notificationCenter.methods.addNotification({
  elements: [
    // Vue Options API component
    {
      template: `Hello {{ text }} world`,
      data: () => ({ text: 'My' })
    },
    // HTML template
    createClonedFromTemplate(),
    // Custom DOM button
    CustomDOMButton('CustomButton'),
    // Vue component with proxy
    proxy.$el
  ],
  position: 'topRight',
  options: {
    timeDuration: null,
    elementClass: 'notification--notice'
  }
})
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the CC-BY-4.0 License - see the LICENSE file for details.
