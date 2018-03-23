export const root = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000' + process.env.BASE_URL + 'api/'
  : process.env.BASE_URL + 'api/'

export async function listModels () {
  return fetch(root)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return err
    })
}
