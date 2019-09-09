const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.static('client'))

app.get('/getfile', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  res.write("data: " + fs.readFileSync('./f.txt', 'utf8') + "\n\n");
  fs.watchFile('./f.txt', () => {
    res.write("data: " + fs.readFileSync('./f.txt', 'utf8') + "\n\n");
  });
})

app.listen(3000, () => console.log('https://localhost:3000/'))
