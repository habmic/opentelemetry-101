import start from './tracer';
start('auth-service');
import express from 'express';
const app = express();

app.get('/auth',(req,res)=>{
    res.json({username: 'Michael Haberman'})
})

app.listen(8080, () => {
    console.log('service is up and running!');
})