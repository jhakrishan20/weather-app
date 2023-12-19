const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});


app.get("/weather", async(req, res) => {

  const city = req.query.city;
  const API_key = "5c30a2d1383edc6e69a716b66ea5c9ae";

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_key}`;
  
  let weather;
  const error = null;
  try{
    const response = await axios.get(apiURL);
    // console.log(response);
    weather = response.data;
    // console.log(weather);
  }catch(error){
    weather = null
    error = "error,please try again";
  };
  
  res.render("index", { weather, error });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port http://localhost:5000`);
});
