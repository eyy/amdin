import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Form from '@/components/form'
import Obj from '@/fields/obj'

Vue.prototype.___ = a => a
Vue.component('obj', Obj)

describe('Form.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Form, {
      propsData: {
        doc: {
          title: 'Hi'
        },
        paths: {
          title: { type: 'String', required: true }
        },
        submit: () => {}
      }
    })
    console.log(wrapper)
  })
})
