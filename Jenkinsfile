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
                sh 'docker build -t devops-portfolio .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 9000:80 --name portfolio-test-container devops-portfolio'
            }
        }
    }
}