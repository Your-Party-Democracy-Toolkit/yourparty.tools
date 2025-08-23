import Autolinker from 'autolinker'
import { defineNuxtPlugin } from '#app'

const linkify = (text = '') =>
  Autolinker.link(text, {
    newWindow: true,
    stripPrefix: true,
    truncate: { length: 60, location: 'end' },
    email: true,
    replaceFn: (match) => {
      const tag = match.buildTag()
      tag.setAttr('rel', 'noopener noreferrer nofollow ugc')
      return tag
    },
  })

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('autolink', {
    mounted(el, binding) {
      el.innerHTML = linkify(binding.value ?? el.textContent ?? '')
    },
    updated(el, binding) {
      el.innerHTML = linkify(binding.value ?? el.textContent ?? '')
    },
  })
})