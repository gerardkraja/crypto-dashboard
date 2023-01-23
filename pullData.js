const promises = await Promise.allSettled(
[fetch('https://api.coincap.io/v2/exchanges/?'
+ new URLSearchParams({
    limit: 10
})),
fetch('https://api.coincap.io/v2/assets/bitcoin/history?'
+ new URLSearchParams({
    interval: 'm30',
    start: 1674292248514,
    end: 1674378902000
}))
])
const result1 = await promises[0].value.json()
console.log(result1)
