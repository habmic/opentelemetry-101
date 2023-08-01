import start from './tracer';
start('todo-service');
import express from 'express';
import axios from 'axios';
const app = express();

import Redis from "ioredis";
const redis = new Redis({host:'redis'});



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
