    var express = require("express")
    const path = require('path'); 
    var app = express()
    var port = process.env.port || 3000;
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/calculate', (req, res) => {
      const num1 = parseFloat(req.query.num1);
      const num2 = parseFloat(req.query.num2);
      
      
      if (isNaN(num1)||isNaN(num2)) {
        return res.send("Error: Please provide a valid number for calculation");
      }
      
      const sum = num1 + num2;
      const product = num1 * num2;
      const difference =  num1 - num2;
      const divide = num1 / num2;
      res.send(`<h1>The sum of ${num1} and ${num2} is: ${sum}<h1> <h1>The product of ${num1} and ${num2} is: ${product}<h1> <h1>The difference of ${num1} and ${num2} is: ${difference}<h1> <h1> ${num1} divided ${num2} is : ${divide}<h1>`);
    });
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });