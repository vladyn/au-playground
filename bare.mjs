import { createServer } from 'bare-http1'

const server = createServer((req, res) => {
  console.log('Request:', req.method, req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello From Bare!\n')
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000')
})

server.on('error', (err) => {
  console.error('Error:', err)
})


server.on('close', () => {
  console.log('Server closed')
})

server.on('request', (req, res) => {
  console.log('Request:', req.method, req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Bare!\n')
})

// install with `npm i bare-http1`
// and run with `bare http-server.mjs`
