// const { ChildProcess } = require('child_process');
// const app =require('./app')
// // console.log(app.z());

//     const arr=[4,3,5,6,7,9];
//    let result= arr.filter((item)=>{
//         return item>4

//     })
//         console.log(result);
//         console.log("path",__filename);
//         const fs=require('fs');
//         fs.writeFileSync("code.txt","hello")
const http=require('http')

http.createServer((req,res)=>{
res.write("hiiii");
res.end();
}).listen(8000);

