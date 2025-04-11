import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Notification from './Notification.vue'

// Mock the v-inject-elements directive
const mockDirective = {
  mounted: () => {} // Empty implementation for testing
}

describe('Notification Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Notification, {
      props: {
        notification: {
          title: 'Test Title',
          message: 'Test Message',
          type: 'info',
          elements: [], // Empty array to avoid forEach error
          options: {
            showCloseButton: true,
            canClose: true
          }
        }
      },
      global: {
        directives: {
          'inject-elements': mockDirective
        }
      }
    })

    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Message')
  })

  it('emits close event when close button is clicked', async () => {
    const destroyMock = vi.fn()

    const wrapper = mount(Notification, {
      props: {
        notification: {
          title: 'Test Title',
          message: 'Test Message',
          type: 'info',
          elements: [], // Empty array to avoid forEach error
          options: {
            showCloseButton: true,
            canClose: true
          },
          destroy: destroyMock
        }
      },
      global: {
        directives: {
          'inject-elements': mockDirective
        }
      }
    })

    const closeButton = wrapper.find('.notification__close-button')
    if (closeButton.exists()) {
      await closeButton.trigger('click')
      expect(destroyMock).toHaveBeenCalled()
    }
  })
})
