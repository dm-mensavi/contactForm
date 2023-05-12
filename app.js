const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const listID = "34c8e31f96";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");
});

  app.post("/", function(req, res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    client.setConfig({
      apiKey: "8c96cb7de4223d1971edfb3141aa884b-us14",
      server: "us14",
    });

    const run = async () => {
      try{
      const response = await client.lists.addListMember(listID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
          PHONE: "0200000000",
        }
      });

      console.log(
        `Successfully created an audience. The audience id is ${response.id}.`
      );
      console.log(response);
    
      // just added 
      res.sendFile(__dirname + "/success.html");
      // res.send("<h1>Thank you for signing up</h1>");

    } catch (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
      // res.send("<h1>Something went wrong! Please try again.</h1>");
    }
  };

    run();

    console.log(fname, lname, email);
    // res.send("Sign up successful");
  });

app.post("/failure", function(req, res) {
  res.redirect("/");
});
   
app.post("/success", function (req, res) { 
  res.redirect("/");
});

app.listen(process.env.PORT || port, function(){

  console.log("Listening on port "+port+ " locally and port "+ process.env.PORT +" on heroku server." );
});



//$ API Key
//# 8c96cb7de4223d1971edfb3141aa884b-us14

// $ Unique ID
// # 34c8e31f96

// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });

// const run = async () => {
//   const response = await client.lists.addListMember("list_id", {
//     email_address: "Ebony_Brekke@gmail.com",
//     status: "pending",
//   });
//   console.log(response);
// };

// run();



