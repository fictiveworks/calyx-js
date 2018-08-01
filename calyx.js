const calyx = function(template, context={}) {
  const parts = template.split(/([{][A-Za-z][A-Za-z0-9_]+[}])/)
  const buffer = []

  for (chunk of parts) {
    if (chunk.length == 0) continue;
    if (chunk[0] == "{" && chunk[chunk.length-1] == "}") {
      const rule = chunk.substring(1, chunk.length-1)
      buffer.push(context[rule])
    } else {
      buffer.push(chunk)
    }
  }

  return buffer.join("")
}

module.exports = calyx
