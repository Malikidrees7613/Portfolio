pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
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
