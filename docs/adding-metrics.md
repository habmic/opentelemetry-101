# Adding metrics

### Install OpenTelemetry libraries
```
yarn add @opentelemetry/sdk-metrics @opentelemetry/exporter-prometheus
```

### Creating Prometheus config file
Create `prometheus` folder

In it create a `prometheus.yml` file

Enter the following content to the newly created file

```
global:
  scrape_interval: 1s # Bad!! just for demo

scrape_configs:
  - job_name: 'opentelemetry'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
    - targets: ['todo:9464','auth:9464']
```


### Running Prometheus

```
  prometheus:
    image: prom/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    volumes:
      - ./prometheus/:/etc/prometheus/
    ports:
      - 9090:9090
```


### Configure && expose OpenTelemetry meter
In the `tracer.ts` file add the following importers

```
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

```

Then add the following to the `start` function
```
    const { endpoint, port } = PrometheusExporter.DEFAULT_OPTIONS;
    const exporter = new PrometheusExporter({}, () => {
        console.log(
          `prometheus scrape endpoint: http://localhost:${port}${endpoint}`,
        );
      });
    const meterProvider = new MeterProvider({
            resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });    meterProvider.addMetricReader(exporter);
    const meter = meterProvider.getMeter('my-service-meter');
```

And return the meter `return meter;`

### Report metrics 
Get the meter from the tracer import `const meter = start('todo-service');`


Then, and the following: 


```
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
```
