pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                // This deletes the corrupted workspace causing the "not in a git directory" error
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                // This uses the URL/Credentials from your Job Configuration
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-portfolio .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop portfolio || true
                docker rm portfolio || true
                docker run -d -p 3000:80 --name portfolio devops-portfolio
                '''
            }
        }
    }
}