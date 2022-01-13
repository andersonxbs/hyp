import express from 'express'
import cors from 'cors'
import { promises as fs } from 'fs'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/imports', async (req, res) => {
  const layer = req.header('hyp-layer') || 'production'
  const result = await fs.readFile('./imports-s3-layers.json')
  return res.json(JSON.parse(result)[layer])
})

app.get('/applications', async (req, res) => {  
  const result = await fs.readFile('./configs.json')
  return res.json(JSON.parse(result))
})

const port = 8600
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})