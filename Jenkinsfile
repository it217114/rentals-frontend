pipeline {
  agent any

  environment {
    IMAGE = "it217114/rentals-frontend"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Node build (inside Docker)') {
      steps {
        script {
          docker.image('node:20-alpine').inside {
            sh '''
              set -eux
              npm ci
              npm run build
            '''
          }
        }
      }
    }

    stage('Docker Build') {
      steps {
        script {
          def GIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          sh """
            set -eux
            docker build -t ${IMAGE}:latest -t ${IMAGE}:${GIT_SHORT} .
          """
          env.GIT_SHORT = GIT_SHORT
        }
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-it217114',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            set -eux
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push '"${IMAGE}:latest"'
            docker push '"${IMAGE}:${GIT_SHORT}"'
            docker logout || true
          '''
        }
      }
    }
  }

  post {
    success { echo "✅ Pushed ${IMAGE}:latest and :${env.GIT_SHORT}" }
  }
}
