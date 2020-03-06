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

myapp.get('', (req, res) => {
    console.log(res.statusCode)
res.status(res.statusCode).render('donation')
})

//to check entered details
myapp.get('/payment-detail', (req, res) => {

    const fungsi = (callback) => {
        const options = {
            url: 'http://localhost:1996/generate/',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            }
        }

       return request.get(options, (err, data) => {
            if (err) {
            console.log(err)
            return callback(err, 'undefined')
           }
           console.log('from data successfull : ')
            console.log(data.body)
            return callback('undefined', data.body)
        })
        
    }

    let urladdress = null
    fungsi((errr, dataa) => {
        if (!errr) {
            console.log('dari error ')
            return res.send(errr)
        }

        const data = JSON.parse(dataa).pid
        urladdress = `https://ssl.dotpay.pl/test_seller/api/v1/accounts/705163/payment_links/${data}/?format=json`
        res.send({data, urladdress})
    })

    // console.log('this is the pid ' + )
    // res.send(getres)
    // const url = `https://ssl.dotpay.pl/test_seller/api/v1/accounts/705163/payment_links/${pid}/?format=json`

})

myapp.get('/generate', (req, res) => {   
    const url = `https://ssl.dotpay.pl/test_seller/api/v1/accounts/705163/payment_links/`

    const pin = 'CJqaCDxhztHIBvP8Wm0HdYKc04Ug4rRN' // pin from the account

    let data_to_post =
    {
        "amount": "9",
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

        const arr = data.headers.location.split('/')
        const pid = arr[arr.length - 2]

        let chk = hash(pin + arr[arr.length - 2]).toString()
        
        res.send({paymentLink: `https://ssl.dotpay.pl/test_payment/?chk=${chk}&pid=${pid}`, pid})
    })
})

myapp.get('/successfull', (req, res) => {
    res.send({message: 'transaction successfull'})
})


myapp.listen(port, ()=>{
    console.log(`connected to port : ${port}`)
})
