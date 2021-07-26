# BMI (Body Mass Index) Calculator
Node.js REST API service endpoint that calculates body mass index (BMI) and its meaning (i.e. underweight, normal, or overweight) depending on the given query string parameters. The accepted query string parameters are `weight` and `height` (e.g. `?weight=70&height=167`).


This project also includes the followings:
- Docker
  - `Dockerfile` to build docker container image of the application (docker image available from https://hub.docker.com/r/raylayadi/bmi-calculator)
- Jenkins CI/CD pipeline
  - `Jenkinsfile` that defines the CI/CD pipeline using Jenkins (multi-branch pipeline)
- Kubernetes
  - `k8s/bmi-calculator` directory which includes the `Deployment`, `Service`, and `ConfigMap` resources to deploy the application on kubernetes cluster
  - `k8s/ingress` directory to deploy kubernetes NGINX ingress controller and resource for host-based routing
  - `k8s/efk` directory to deploy EFK (ElasticSearch, Fluentd, and Kibana) stack for application logging on kubernetes
  - `k8s/prometheus-grafana` directory to deploy Prometheus and Grafana for monitoring on kubernetes

## Assumptions

The BMI calculator application assumes the followings:
- Accepted routes:
  - `GET /?weight=<weight>&height=<height>` for calculating BMI and its meaning
    - `height (cm)` should be a positive **integer** >= 1 and <= 350
    - `weight (kg)` could be a floating point number > 0 and <= 800 
    - BMI value is returned as floating point number rounded to 1 decimal place
    - Label (underweight (`this.bmi < 18.5`), normal (`this.bmi >= 18.5 && this.bmi < 25`), and overweight (`this.bmi >= 25`)) is calculated based on the BMI value
  - `GET /metrics` for consumption by Prometheus

## Getting Started

### Access the BMI calculator (online)
```
# Calculate BMI for weight (70 kg) and height (167 cm)
curl "http://bmi.raylayadi.com/?weight=70&height=167"

# Output
{"success":true,"bmi":25.1,"label":"overweight"}
```

## Local Deployment

### Environment variables
```
# Default values
NODE_ENV=development # ['production', 'development', 'staging', 'qa']
NODE_PORT=3000 
NODE_LOG_LEVEL='silly' # NPM logging level ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']

# [optional] if logs should be stored as a file (winston-daily-rotate-file) instead of displaying it on the console (for container based solution, display on console is preferred)
# Example:
NODE_LOG_SERVICE_NAME='bmi-calculator-service'
NODE_LOG_DIR_PATH='./logs/'
NODE_LOG_RETENTION_DAYS='14d'
NODE_LOG_RETENTION_MAX_FILE_SIZE='20m'
```

### Run on local machine
```
git clone https://github.com/raykrishardi/bmi-calculator.git
cd bmi-calculator
npm install
npm start
curl "http://localhost:3000/?weight=70&height=167"
```

### Run on Docker
```
docker run -d -p 3000:3000 --name bmi-calculator raylayadi/bmi-calculator:latest
curl "http://localhost:3000/?weight=70&height=167"
```

### Run on Kubernetes
```
# Create the resources
kubectl apply -f https://raw.githubusercontent.com/raykrishardi/bmi-calculator/main/k8s/bmi-calculator/bmi-calculator-cm.yaml
kubectl apply -f https://raw.githubusercontent.com/raykrishardi/bmi-calculator/main/k8s/bmi-calculator/bmi-calculator-deploy.yaml
kubectl apply -f https://raw.githubusercontent.com/raykrishardi/bmi-calculator/main/k8s/bmi-calculator/bmi-calculator-svc.yaml

# Enable access from localhost
kubectl port-forward service/bmi-calculator 3000:80

# Access the service
curl "http://localhost:3000/?weight=70&height=167"
```

