import Vue from 'vue'
// import { memoize } from 'lodash'

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
    .catch(err => {
      bus.$emit('error', err)
      console.error(err)
      return err
    })
}

export const listModels = function () {
  return go()
}

export const getSchema = function (model) {
  return go(model + '/schema')
}

export function getDocs (model) {
  return go(model)
}

export function postDoc (model, data) {
  return go(model, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function getDoc (model, id) {
  return go(model + '/' + id)
}

export function putDoc (model, id, data) {
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