const discount = 0.15 // 15% discount

const creditCardInitialData = {
  cardNumber: "1234567890123456",
  expiryDate: "12/23",
  cvv: "123",
  email: "john.doe@example.com",
}

const tableData = [
  // { value: "", label: "Select a table number" },
  { value: "11", label: "Table 11" },
  { value: "12", label: "Table 12" },
  { value: "13", label: "Table 13" },
  { value: "21", label: "Table 21" },
  { value: "22", label: "Table 22" },
  { value: "23", label: "Table 23" },
  { value: "31", label: "Table 31" },
  { value: "32", label: "Table 32" },
  { value: "33", label: "Table 33" },
]

module.exports = { discount, creditCardInitialData, tableData }
