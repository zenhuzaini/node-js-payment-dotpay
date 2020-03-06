const express = require('express')
const myapp = express()
const path = require('path')
const hbs = require('hbs')

const hash = require('crypto-js/sha256')
const request = require('request')


const port = 1996 || precess.env.port

const viewLocation = path.join(__dirname, '../templates') 
myapp.set('view engine', 'hbs')
myapp.set('views', viewLocation)

console.log(viewLocation)

myapp.get('/error', (req, res) => {
    throw new Error('this is the error')
    res.status(res.statusCode).send('something here')
})

myapp.get('', (req, res) => {
    console.log(res.statusCode)
res.status(res.statusCode).render('donation')
})

myapp.get('/generate', (req, res) => {   
    const url = `https://ssl.dotpay.pl/test_seller/api/v1/accounts/705163/payment_links/`

    const pin = 'CJqaCDxhztHIBvP8Wm0HdYKc04Ug4rRN'

    let data_to_post =
    {
        "amount": "79.60",
        "currency": "PLN",
        "description": "test payment from link",
        // "control": "202cb9dsf52d23434ed",
        "language": "pl",
        "ignore_last_payment_channel": 1,
        "redirection_type": 0,
        "url": "https://demo.hopeit.pl/",
        "urlc": "https://demo.hopeit.pl/",
        "payer": {
           "first_name": "John",
           "last_name": "Smith",
           "email": "john.smith@example.com",
           "phone": "+48123456789",
           "address": {
              "street": "Wielicka",
              "building_number": "28B",
              "postcode": "30-552",
              "city": "Krakow",
              "region": "Malopolska",
              "country": "POL"
           }
        },
        "seller": {
           "p_info": "My Best Shop"
        }
     }
    let options = {
        url: url,
        method: 'POST',
        body : JSON.stringify(data_to_post),
        auth: {
            'username': 'huzainimhd@gmail.com',
            'password': '@101101996zen'
        },
        headers: {
           'Content-Type': 'application/json',
        }
    }

    const data = request(options, (err, data) => {
        if (err) {
        console.log(err)
           return res.send(err.Error)
        } 

        arr = data.headers.location.split('/')

        let hashed = hash(pin + arr[arr.length - 2]).toString()
        
        res.json({data: `https://ssl.dotpay.pl/test_payment/?chk=${hashed}&pid=${arr[arr.length - 2]}`})
    })
})

myapp.get('/successfull', (req, res) => {
    res.send({message: 'transaction successfull'})
})




myapp.get('/go', (req, res) => {
    
    //try to gather all of the information about the user,
    //about the merchantID
    //currency
    //description

    //function to hash all of the payment to get the signature
    // get the pid 

    const data = {
        id: req.params.id,
        amount: req.params.amount,
        currency: req.params.currency,
        description: 'Payment Invoice',
        type: 0,
        url: 'http://www.demo.hopeit.pl',
        buttontext : 'Return'
    }
    //this works because it generate payment
    //maybe I need to create a redirection

    //route 
    //Mars
    //Pay 20
    //pay 30
    //pay 40

    if (data.amount == 2) {
    res.redirect('https://ssl.dotpay.pl/test_payment/?chk=68be60e23a50105c280b8137b44457ddc437d792cfc4ac2507adcb2a5bcebc54&pid=juw7avicsdwbhtbrpz9gulwnqzp038ss')
        
    } else if(data.amount) {
    res.redirect('https://ssl.dotpay.pl/test_payment/?chk=68be60e23a50105c280b8137b44457ddc437d792cfc4ac2507adcb2a5bcebc54&pid=juw7avicsdwbhtbrpz9gulwnqzp038ss') 
    } else {
    res.redirect('https://ssl.dotpay.pl/test_payment/?chk=68be60e23a50105c280b8137b44457ddc437d792cfc4ac2507adcb2a5bcebc54&pid=juw7avicsdwbhtbrpz9gulwnqzp038ss')
        
    }
})

myapp.listen(port, ()=>{
    console.log(`connected to port : ${port}`)
})
