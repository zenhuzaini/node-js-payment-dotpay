const axios = require('axios')
const request = require('request')

const getamount = async (id_merchant, amount, currency, description) =>{
    const url = `https://ssl.dotpay.pl/t2/?id=${id_merchant}&amount=${amount}&currency=${currency}&description=Test`
    if(!id_merchant || !amount || !currency || !description ){
return {message: 'parameters are not completed'}
    }

    try {
    const data = await axios.get(url) 
    } catch (error) {
        
    }
}

const test_dotpay = (currency, amount, description) => {
    const configuration = {
        id:705163,
        environment: 'test',
        pin: 'CJqaCDxhztHIBvP8Wm0HdYKc04Ug4rRN'
    
    }

    const {id, environment, pin} = configuration


}

module.exports = test_dotpay

