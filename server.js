const express = require("express"); //it is an ES5 module syntax
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); //during deploy time use it

//dotenv configuartion
dotenv.config();

//rest object
const app = express();

//midlewares
app.use(cors());
app.use(express.json());

//static files access
//Only using Build we can do it
// app.use(express.static(path.join(__dirname, "./client/build")));
 //during deploy get files access from build as they are static and code hides "use npm run dev in terminal in client so build folder will be created that is used for static files upload without code for optimized deploye in vercel"

//routes
// app.get('/',(req,res)=>{
//     res.send("<h1>Welcome to Node Server</h1>");
// })
//___________________________________

// const portfolioRoute=require("./routes/portfolioRoute");
// app.use("/api/v1/portfolio",portfolioRoute);
//__________________OR_________________
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));
//Remember that in browser we always can "get" the server response and we can't post on brwoser directly


//Only using Build we can do it
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// }); //during deploy get files 

//port
const PORT = process.env.PORT || 8080; //"|| means if dot env not works then use 8080 directly"

//listen
// http://localhost:8080/ search it on a blank page.
app.listen(PORT, () => {
  console.log(`Server Runnning On PORT ${PORT} `);
});
