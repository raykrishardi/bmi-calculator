#!/bin/bash

# Install EFK
helm repo add elastic https://Helm.elastic.co \
&& helm install elasticsearch elastic/elasticsearch -f values-linode.yaml \
&& helm install kibana elastic/kibana \
&& helm repo add bitnami https://charts.bitnami.com/bitnami \
&& helm install fluentd bitnami/fluentd
