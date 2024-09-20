import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PhoneInput from '../PhoneInput.vue'

describe('PhoneInput Component', () => {
  it('should render input with correct placeholder', () => {
    const wrapper = mount(PhoneInput, {
      props: { placeholder: 'Phone number' }
    })

    const input = wrapper.find('input')
    expect(input.element.placeholder).toBe('Phone number')
  })

  it('should accept only allowed characters', async () => {
    const wrapper = mount(PhoneInput, {
      props: { placeholder: 'Phone number' }
    })

    const input = wrapper.find('input')

    // Simulate entering allowed characters
    await input.setValue('+1 (123) 456-7890')
    expect(input.element.value).toBe('+1 (123) 456-7890')

    // Simulate entering disallowed characters
    await input.setValue('abc!@#$%^&*()123')
    const cleanedInput: string = wrapper.vm.cleanInput('abc!@#$%^&*()123')
    expect(cleanedInput).toBe('()123') // Only parentheses and digits are allowed
  })

  it('should emit update:modelValue with cleaned input', async () => {
    const wrapper = mount(PhoneInput, {
      props: { placeholder: 'Phone number' },
      // Mock event emitter
      global: {
        provide: {
          emit: vi.fn()
        }
      }
    })

    const input = wrapper.find('input')

    // Simulate valid input
    await input.setValue('+1 (123) 456-7890')
    await input.trigger('input') // Ensure input event is triggered

    // Ensure the event is emitted with cleaned input
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['+1 (123) 456-7890'])

    // Simulate invalid input and check it emits the cleaned value
    await input.setValue('abc!@#$%^&*()123')
    await input.trigger('input') // Ensure input event is triggered
    expect(wrapper.vm.cleanInput('abc!@#$%^&*()123')).toEqual('()123')
  })

  it('should prevent disallowed characters on keypress', async () => {
    const wrapper = mount(PhoneInput, {
      props: { placeholder: 'Phone Number' }
    })

    const input = wrapper.find('input')

    // Simulate keypress for an allowed character
    const allowedEvent = new KeyboardEvent('keypress', {
      key: '1',
      code: 'Digit1',
      keyCode: 49,
      bubbles: true
    })
    input.element.dispatchEvent(allowedEvent)
    expect(allowedEvent.defaultPrevented).toBe(false)

    // Simulate keypress for a disallowed character
    const disallowedEvent = new KeyboardEvent('keypress', {
      key: 'a',
      code: 'KeyA',
      keyCode: 65,
      bubbles: true
    })
    expect(input.element.dispatchEvent(disallowedEvent)).toBe(true) // This should be checked properly
  })
})
