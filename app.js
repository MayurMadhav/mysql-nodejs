import express from 'express'
import { getDetail, getDetails, createCustomer, deleteCustomer, updateCustomer } from './database.js'

const app = express()

app.use(express.json())

app.get('/customer', async (req,res) => {
    const details = await getDetails()
    res.send(details)
})

app.get('/customer/:id', async (req,res) => {
    const id = req.params.id
    const details = await getDetail(id)
    res.send(details)
})

app.delete('/customer/:id', async (req,res) => {
    const id = req.params.id
    const details = await deleteCustomer(id)
    res.send(details)
})

app.post("/customer", async (req, res) => {
    const { C_ID, First_Name, Last_Name, PhoneNo} = req.body
    const cust = await createCustomer(C_ID, First_Name, Last_Name, PhoneNo)
    res.status(201).send(cust)
})

app.patch("/customer", async (req, res) => {
    const { C_ID, First_Name} = req.body
    const cust = await updateCustomer(C_ID, First_Name)
    res.status(201).send(cust)
})

app.put("/customer", async (req, res) => {
    const { C_ID, First_Name} = req.body
    const cust = await updateCustomer(C_ID, First_Name)
    res.status(201).send(cust)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Server is running at port 8080')
}) 
