# Turning on debug logs

### Option #1 - via env var
Add an environment variable like so
```
environment:
      - OTEL_LOG_LEVEL=ERROR
```

### Option #2 - via code
Add the following imports

```
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
```

Configure the logger
```
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
```

