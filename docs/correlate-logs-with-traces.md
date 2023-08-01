# Correlate logs with traces

### Change logs to
```
        try {
            throw new Error('Really bad error!')
        } catch (e: any) {
            const activeSpan = api.trace.getSpan(api.context.active());
            activeSpan?.recordException(e)
            console.error('Really bad error!', {
                spanId: activeSpan?.spanContext().spanId,
                traceId: activeSpan?.spanContext().traceId,
                traceFlag: activeSpan?.spanContext().traceFlags,
            });
            res.sendStatus(500);
        }
```
