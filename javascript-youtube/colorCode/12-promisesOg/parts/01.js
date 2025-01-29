function getWeather(){
    return new Promise(function(resolve,reject){
        resolve('Sunny')
    })
}

const promise = getWeather()

// promise.then(console.log(data))
console.log('lkjdf')
