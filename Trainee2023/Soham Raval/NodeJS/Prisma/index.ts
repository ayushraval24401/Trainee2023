// import  express  from "express";
// const bodyparser=require('body-parser');
// import route from './Route/index';

// const app=express();

// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended:true}))
// app.use(route);
// const port=6000;
// app.listen(port, () => console.log(`Server running on port ${port}.`));

// console.log("Start server");
import server from "./server";
const app=new server();
app.start();
