import start from './tracer';
const meter = start('todo-service');
import express from 'express';
import axios from 'axios';
const app = express();

import Redis from "ioredis";
const redis = new Redis({host:'redis'});

const calls = meter.createHistogram('http-calls');

app.use((req,res,next)=>{
    const startTime = Date.now();
    req.on('end',()=>{
        const endTime = Date.now();
        calls.record(endTime-startTime,{
            route: req.route?.path,
            status: res.statusCode,
            method: req.method
        })
    })
    next();
})

const sleep = (time:number)=>{return new Promise((resolve)=>{setTimeout(resolve,time)})};


app.get('/todos', async (req, res) => {
    const user = await axios.get('http://auth:8080/auth');
    const todoKeys = await redis.keys('todo:*');
    const todos: any = [];
    for (let i = 0; i < todoKeys.length; i++) {
        const todoItem = await redis.get(todoKeys[i])
        if (todoItem) {
            todos.push(JSON.parse(todoItem));
        }
    }

    if(req.query['slow']){
        await sleep(1000);
    }

    if(req.query['fail']){
        console.error('Really bad error!');
        res.sendStatus(500);
    }

    res.json({ todos, user:user.data });
})

app.listen(8080, () => {
    console.log('service is up and running!');
})


async function init() {
    await Promise.all([
        redis.set('todo:1', JSON.stringify({ name: 'Install OpenTelemetry SDK' })),
        redis.set('todo:2', JSON.stringify({ name: 'Deploy OpenTelemetry Collector' })),
        redis.set('todo:3', JSON.stringify({ name: 'Configure sampling rule' })),
        redis.set('todo:4', JSON.stringify({ name: 'You are OpenTelemetry master!' }))]
    );
}
init();
