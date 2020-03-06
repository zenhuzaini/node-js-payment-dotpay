const fs = require('fs')
const myfunction = new Promise((resolve, reject)=>{
setTimeout(()=>{
resolve({message: 'something is installed'})
}, 1000)

})

.then((result) => {
    console.log(result)
}).catch((err) => {
    console.log('nothing')
});

