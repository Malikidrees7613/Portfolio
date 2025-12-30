pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Cleanup and Checkout') {
            steps {
                deleteDir()
                git branch: 'main', url: 'https://github.com/Malikidrees7613/DevOps_Assignment_No_1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Using the Dockerfile shown in your screenshot
                sh 'docker build -t devops-portfolio .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop portfolio || true
                docker rm portfolio || true
                # Changed local port from 3000 to 8081
                docker run -d -p 8081:80 --name portfolio devops-portfolio
                '''
            }
        }
}