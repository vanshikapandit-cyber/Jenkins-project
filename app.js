const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send("Hello from browser, I am vanshika")
});

app.listen(3000,()=>
{
    console.log("server is running in port 3000");
});
console.log("This is jenkins");
function fun()
{
   return "hi, there!!!!";
}
 let sum = fun();
 console.log(sum);