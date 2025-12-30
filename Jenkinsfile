pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Clear the folder first to prevent "not a git directory" errors
                cleanWs() 
                
                // Explicitly clone the repo
                git branch: 'main', 
                    url: 'https://github.com/Malikidrees7613/DevOps_Assignment_No_1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Verify files exist before building
                sh 'ls -la' 
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