import { mount } from '@vue/test-utils'
import Card from '@/components/widgets/Card.vue'

describe('CardTest', () => {
  it('renders correctly', async () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
        link: '/test-link',
        image: 'test-image.jpg'
      }
    })

    expect(wrapper.exists()).toBe(true)

    const titleElement = wrapper.find('h3')
    expect(titleElement.text()).toBe('Test Title')

    const imageElement = wrapper.find('img')
    expect(imageElement.exists()).toBe(true)
    expect(imageElement.attributes('src')).toBe('test-image.jpg')
    expect(imageElement.attributes('alt')).toBe('Test Title')
  })
})
