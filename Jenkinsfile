pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh './scripts/bmi.test.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}