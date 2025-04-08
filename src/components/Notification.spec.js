import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Notification from './Notification.vue'

describe('Notification Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Notification, {
      props: {
        title: 'Test Title',
        message: 'Test Message',
        type: 'info',
      },
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Message')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Notification, {
      props: {
        title: 'Test Title',
        message: 'Test Message',
        type: 'info',
        options: {
          canClose: true,
        },
      },
    })

    const closeButton = wrapper.find('.notification-close-button')
    if (closeButton.exists()) {
      await closeButton.trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    }
  })
})
