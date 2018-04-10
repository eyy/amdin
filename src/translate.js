export default {
  install (Vue, options = {}) {
    let dict = {}

    Vue.prototype.___ = function (...params) {
      let text = params[ 0 ]

      if (dict.hasOwnProperty(text))
        text = dict[ text ]
      else if (dict._name !== 'English')
        console.warn(text, 'untranslated')

      return text.replace(replaceReg, (match, p1) => params[ p1 ])
    }

    Vue.prototype.$setLang = function (lang) {
      dict = lang
      if (dict._direction)
        document.body.dir = dict._direction
    }

    if (options.lang)
      Vue.prototype.$setLang(options.lang)
  }
}

const replaceReg = /\$(\d)?/
