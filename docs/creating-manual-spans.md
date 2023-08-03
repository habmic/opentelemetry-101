# Creating manual spans

### Add an import for OpenTelemetry API
```
import opentelemetry from "@opentelemetry/api";
```

### Start and end the span

```
    opentelemetry.trace.getTracer('init').startActiveSpan('Set default items', async (span) => {
        // Application code goes here
        span.end();
    })
```

