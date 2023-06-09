const express = require('express')
const app = express()
const port = 3000
let name="Anonymous User";

console.log("index js successfully loaded\n");
app.listen(port, () => {
  console.log(`\nExample app listening on port ${port}`)
})

app.get('/', (req, res) => {
res.send(`<h1><b>Hello ${name}</b></h1><br><h2>Welcome to my server !<h2>`)
});