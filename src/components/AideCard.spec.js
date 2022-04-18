import AideCard from './AideCard.vue'

import { mount } from '@vue/test-utils'

const wrapper = mount(AideCard)

const vm = wrapper.vm

// Чтобы изучить wrapper подробнее, просто выведите его в консоль
// и ваши приключения с `vue-test-utils` начнутся
console.log(wrapper)

describe('Компонент Counter', () => {
  // Теперь монтируем компонент и получаем wrapper
  // const wrapper = mount(Counter)

  it('отображает корректную разметку', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // также легко проверить наличие других элементов
  it('имеет кнопку', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
