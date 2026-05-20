const router = require('express').Router()
const prisma = require('../lib/prisma')

router.get('/', async (req, res) => {
  const reads = await prisma.read.findMany()
  res.json(reads)
});


router.get("/test", async (req, res) => {
  res.send("Tested successfully from /read/test")
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
