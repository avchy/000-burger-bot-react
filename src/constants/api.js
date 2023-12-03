const cloudinaryURL =
  "https://res.cloudinary.com/dvb3cxb9h/image/upload/v1699620958/burger_shop/";

const port = "8000";

const developmentURL = "http://localhost:5005";
const productionURL = "https://burgerim.ru";

// export const baseURL =
//   process.env.NODE_ENV === "development" ? developmentURL : productionURL;

const baseURL =
  process.env.REACT_APP_STAGE === "local" ? developmentURL : productionURL;

console.log("process.env.REACT_APP_STAGE", process.env.REACT_APP_STAGE);
console.log("baseURL", baseURL);

module.exports = { baseURL, port, cloudinaryURL };
