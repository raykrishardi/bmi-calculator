def app

pipeline {
    agent any

    environment {
      DOCKER_IMAGE_NAME = "raylayadi/bmi-calculator"
      DOCKER_REGISTRY = "https://registry.hub.docker.com"
      DOCKER_LOGIN_JENKINS_CREDENTIALS = "docker-login"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './scripts/bmi.test.sh'
            }
        }
        stage('Deploy') {
            steps {
                script {
                   // Only build the docker image if the test is successful
                   app = docker.build("${env.DOCKER_IMAGE_NAME}")

                   // Push docker image to the docker registry
                   docker.withRegistry("${env.DOCKER_REGISTRY}", "${env.DOCKER_LOGIN_JENKINS_CREDENTIALS}") {
                    app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
                   }
                }
            }
        }
    }
}