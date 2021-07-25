pipeline {
    agent any

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
                sh 'sudo docker build -t bmi-calculator:${BUILD_NUMBER} .'
                sh 'sudo docker tag bmi-calculator:${BUILD_NUMBER} raylayadi/bmi-calculator:${BUILD_NUMBER}'
                sh 'sudo docker push raylayadi/bmi-calculator:${BUILD_NUMBER}' 
            }
        }
    }
}