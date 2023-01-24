const promises = await Promise.allSettled(
[fetch('https://api.coincap.io/v2/exchanges/?'
+ new URLSearchParams({
    limit: 10
})),
fetch('https://api.coincap.io/v2/exchanges?'
+ new URLSearchParams({
    search: 'bi',
}))
])
const result1 = await promises[1].value.json()
console.log(result1)
