const router = require('express').Router()
const prisma = require('../lib/prisma')

router.get('/', async (req, res) => {
  const reads = await prisma.read.findMany()
  res.json(reads)
});


router.get("/test", async (req, res) => {
  res.send("Tested successfully from /read/test")
})

router.get('/check', async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'url query parameter is required' })
  }

  const existing = await prisma.read.findFirst({ where: { url } })
  res.json({ exists: !!existing, read: existing })
})

router.post('/', async (req, res) => {
  const { url, notes } = req.body

  const existing = await prisma.read.findFirst({ where: { url } })

  if (!existing) {
    const read = await prisma.read.create({ data: { url, notes } })
    res.status(201).json(read)
  } else {
    await prisma.read.delete({ where: { id: existing.id } })
    res.status(204).send()
  }
})

module.exports = router
