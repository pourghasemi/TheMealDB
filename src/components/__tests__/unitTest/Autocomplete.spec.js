import { mount } from '@vue/test-utils'
import Autocomplete from '@/components/widgets/Autocomplete.vue'

describe('AutocompleteTest', () => {
  it('renders correctly', async () => {
    const wrapper = mount(Autocomplete, {
      props: {
        source: [
          { name: 'Result 1', link: '/result-1' },
          { name: 'Result 2', link: '/result-2' }
        ],
        modelValue: '',
        resultsPage: '/results'
      }
    })

    expect(wrapper.exists()).toBe(true)

    const inputElement = wrapper.find('input')
    expect(inputElement.exists()).toBe(true, 'Input element should exist.')

    const autocompleteList = wrapper.find('ul')
    expect(autocompleteList.isVisible()).toBe(false, "Autocomplete list shouldn't be visible.")

    await inputElement.setValue('Search Query')
    expect(autocompleteList.isVisible()).toBe(true, 'Autocomplete list should be visible.')

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(2, 'There should be two items in search list')

    await listItems[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
