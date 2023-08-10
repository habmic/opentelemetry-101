# Context propagation and baggage

### import both W3C context propagation
Import in tracer.ts
```
import {W3CBaggagePropagator, W3CTraceContextPropagator, CompositePropagator} from '@opentelemetry/core'
```

### Configure context propagators
In the `NodeSDK` object
```
textMapPropagator: new CompositePropagator({
    propagators:[new W3CTraceContextPropagator(), new W3CBaggagePropagator()]
})
```

### Set the baggage
Create the baggage before we call auth service
```
const baggage = opentelemetry.propagation.createBaggage({
    key1: {
        value: "value1"
    }
})
const contextWithBaggage= opentelemetry.propagation.setBaggage(opentelemetry.context.active(), baggage);
```

### Use the context with baggage to call auth service
```
opentelemetry.context.with(contextWithBaggage, async () => {
    /// Any new span in this context will have the baggage. 
})

```

### Extract the baggage in downstream service

```
const baggage = opentelemetry.propagation.getActiveBaggage()
```
