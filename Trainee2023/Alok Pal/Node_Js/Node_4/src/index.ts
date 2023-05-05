import express ,{Request,Response} from 'express'

const app = express();
const PORT = 4011;

app.get('/test', (req:Request, res:Response):void=>{
    res.json({data:"test Page Alll"})
})


app.listen(PORT, ():void=>{
    console.log(`Server is started on ${PORT}`)
})