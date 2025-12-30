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

        stage('Deploy Portfolio') {
    steps {
        sh '''
        # Force remove the container and the name reservation
        docker rm -f portfolio || true 
        
        # Run the new container
        docker run -d -p 3000:80 --name portfolio devops-portfolio
        '''
    }
}
    }
}