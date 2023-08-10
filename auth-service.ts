import start from './tracer';
start('auth-service');
import opentelemetry from "@opentelemetry/api";
import express from 'express';
const app = express();

app.get('/auth',(req,res)=>{
    const baggage = opentelemetry.propagation.getActiveBaggage()
    console.log('baggage',baggage)
    res.json({username: 'Michael Haberman', userId:123})
    opentelemetry.trace.getActiveSpan()?.setAttribute('userId',123);
})

app.listen(8080, () => {
    console.log('service is up and running!');
})