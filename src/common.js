export function emptyDoc (paths, doc = {}) {
  for (let n in paths)
    if (paths.hasOwnProperty(n))
      doc[ n ] = empty(paths[ n ])
  return doc
}

function empty (path) {
  if (path.default)
    return path.default

  if (path.enum)
    return path.enum[ 0 ]

  if (path.schema)
    return []

  let field = path.field || (path.type || 'obj').toLowerCase()

  if (field === 'number')
    return path.min ? path.min : 0

  if (field === 'picture')
    return []

  return null
}
