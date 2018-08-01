const calyx = require("./calyx")

console.log(calyx("Hello"))
console.log(calyx("Hello {world}", { world: "WORLD" }))
