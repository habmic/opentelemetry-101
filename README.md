# Observability in Cloud Native apps using OpenTelemetry

Welcome to the Observability in Cloud Native apps using OpenTelemetry
 repository! This repository contains a demo application that is being used throughout the Udemy course. Whether you're a beginner or an experienced developer, the demo application will help you learn and understand the fundamentals of OpenTelemetry and Observability.


## Following the course code examples
This course is built in such a way that we start with a simple application, and with every section of the course, we add more functionally to OpenTelemetry. 

To navigate between the different phases of the course I have used git tags. Below is a table with all the available tags (after you have cloned the repo it is recommended to checkout the first tag)

| Deprecated tag | New tag  | Description |
| ------------- | ------------- | ------------- |
| 1 | 1 | Before we install OpenTelemetry  |
| 2 | 2 | Basic OpenTelemetry installation  |
| 3 | 3 | Adding Metrics  |
| 4 | 4 | Correlating logs with traces  |
| 5 | 5 | Creating manual spans  |
| 6 | 6 | Adding custom attributes  |
| 7 | 7 | Debug logs  |
| 8 | 8 | Define custom resources  |
| 9 | 9 | Configure custom sampler  |
| 10 | 10  | Using context propagation to set baggage  |
| 11 | 11-v2 | Using the OpenTelemetry Collector  |
| 12 | 12-v2 | Setting up tail sampling  |

## How to use this repo

1. **Clone the Repository:** 

```
git clone https://github.com/habmic/opentelemetry-101.git
```

2. **Checkout the first tag:** 

```
git checkout 1
```

3. **Running it with docker:** 
First run `yarn install` and then `docker-compose up`


>The best way to learn is by experimenting and modifying the code. Try tweaking the code to understand how different configurations and scenarios affect the telemetry data.

## Feedback and Contributions

Your feedback to this repository are highly appreciated! If you encounter any issues or have ideas to improve it, please feel free to open an issue or submit a pull request. Let's make this learning resource better together!

## Acknowledgments

Special thanks to all the contributors who have helped create and improve these code examples. Your dedication to sharing knowledge and helping others learn is invaluable.

Happy learning!

*Michael Haberman*
*habmic@gmail.com*
