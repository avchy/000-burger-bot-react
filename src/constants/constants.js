const discount = 0.15 // 15% discount

const creditCardInitialData = {
  cardNumber: "1234567890123456",
  expiryDate: "12/23",
  cvv: "123",
  email: "john.doe@example.com",
}

const tableData = [
  { value: "", label: "Select a table number" },
  { value: "1", label: "Table 1" },
  { value: "2", label: "Table 2" },
  { value: "3", label: "Table 3" },
]

module.exports = { discount, creditCardInitialData, tableData }
