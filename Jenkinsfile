pipeline {
  agent any

  environment {
    IMAGE = "it217114/rentals-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.GIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          echo "GIT_SHORT=${env.GIT_SHORT}"
        }
      }
    }

    // Optional γρήγορο verify
    stage('Node verify (optional)') {
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
        sh '''
          set -eux
          docker build \
            -t ${IMAGE}:latest \
            -t ${IMAGE}:${GIT_SHORT} \
            .
        '''
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
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin docker.io
            docker push ${IMAGE}:latest
            docker push ${IMAGE}:${GIT_SHORT}
          '''
        }
      }
    }
  }

  post {
    always { sh 'docker logout || true' }
    success { echo "✅ Pushed ${IMAGE}:latest and :${GIT_SHORT}" }
  }
}
