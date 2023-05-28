const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return (acc += item.price)
    }, 0)
}

module.exports = { getTotalPrice }
