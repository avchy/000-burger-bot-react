import axios from "axios"

const postAxios = async (url, body) => {
  try {
    const response = await axios.post(url, body)
  } catch (error) {
    console.error('Ошибка при выполнении запроса "postAxios":', error)

    return
  }
}

module.exports = { postAxios }
