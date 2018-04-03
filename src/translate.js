export default {
  install (Vue, options = {}) {
    let dict = {}
    global.dict = dict

    Vue.prototype.$setLang = function (lang) {
      dict = lang
      global.dict = dict
      if (dict._direction)
        document.body.dir = dict._direction
    }

    if (options.lang)
      Vue.prototype.$setLang(options.lang)

    Vue.prototype.___ = function (...params) {
      let text = params[0]

      if (dict.hasOwnProperty(text))
        text = dict[ text ]

      return text.replace(replaceReg, (match, p1) => params[p1])
    }
  }
}

const replaceReg = /\$(\d)?/