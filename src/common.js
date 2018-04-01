export function emptyDoc (paths) {
  let acc = {}
  for (let n in paths)
    if (paths.hasOwnProperty(n))
      acc[ n ] = empty(paths[ n ])
  return acc
}

function empty (path) {
  if (path.default)
    return path.default

  if (path.enum)
    return path.enum[ 0 ]

  if (path.schema)
    return []

  let type = path.type.toLowerCase()

  if (type === 'number')
    return path.min ? path.min : 0

  return null
}