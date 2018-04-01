export default {
  install (Vue, options = {}) {
    const dict = options.dict || {}

    Vue.translate = { dict }

    Vue.prototype.___ = function (...params) {
      let text = params[0]

      if (dict.hasOwnProperty(text))
        text = dict[ text ]
      else
        dict[ text ] = text

      return text.replace(/\$(\d)?/, (match, p1) => params[p1])
    }
  }
}