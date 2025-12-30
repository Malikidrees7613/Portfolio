pipeline {
    agent any
    options {
        // This stops Jenkins from trying the automatic checkout that is failing
        skipDefaultCheckout()
    }
    stages {
        stage('Cleanup and Checkout') {
            steps {
                // Wipe the broken directory completely
                deleteDir() 
                
                // Manually perform the clone
                git branch: 'main', 
                    url: 'https://github.com/Malikidrees7613/DevOps_Assignment_No_1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-portfolio .'
            }
        }

        stage('Deploy') {
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