import Vue from 'vue'
import memoize from 'lodash/memoize'

export const root = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000' + process.env.BASE_URL + 'api/'
  : process.env.BASE_URL + 'api/'

export const bus = new Vue

function go (path = '', opts = {}) {
  opts.headers = {
    'content-type': 'application/json'
  }
  return fetch(root + path, opts)
    .then(res => res.json())
    .then(res => {
      // console.log(path, res)
      if (res.status === 500 && res.name !== 'ValidationError')
        return Promise.reject(res)
      return res
    })
    .catch(err => {
      bus.$emit('error', err)
      return err
    })
}

export const start = memoize(function () {
  return go()
})

export const getOptions = memoize(function (model) {
  return go(model + '/options')
})

export function getDocs (model) {
  return go(model)
}

export function getRef (model) {
  return go(model + '/ref')
}

export function sortDocs (model, data) {
  return go(model + '/sort', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function postDoc (model, data) {
  return go(model, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function getDoc (model, id = 'first') {
  return go(model + '/' + id)
}

export function putDoc (model, id = 'first', data) {
  return go(model + '/' + id, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export function deleteDoc (model, id) {
  return go(model + '/' + id, {
    method: 'DELETE'
  })
}

export function act (model, index, id) {
  return go(model + '/actions/' + index + '/' + id, {
    method: 'PUT'
  })
}
