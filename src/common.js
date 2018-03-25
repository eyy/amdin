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

  return null
}