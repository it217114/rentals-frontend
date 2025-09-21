pipeline {
  agent any

  environment {
    IMAGE = "it217114/rentals-frontend"
    GIT_SHORT = "${env.GIT_COMMIT?.take(7)}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    // Αν το Dockerfile σου κάνει ήδη multi-stage (node build -> nginx),
    // αυτό το στάδιο μπορεί να παραλειφθεί. Το κρατάω για γρήγορο lint.
    stage('Node verify (optional)') {
      steps {
        script {
          docker.image('node:20-alpine').inside {
            sh 'npm ci'
            sh 'npm run build'
          }
        }
      }
    }

    stage('Docker Build') {
      steps {
        sh """
          docker build \
            -t ${IMAGE}:latest \
            -t ${IMAGE}:${GIT_SHORT} \
            .
        """
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
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push '"${IMAGE}:latest"'
            docker push '"${IMAGE}:${GIT_SHORT}"'
          '''
        }
      }
    }
  }

  post {
    success { echo "✅ Pushed ${IMAGE}:latest and :${GIT_SHORT}" }
    always  { sh 'docker logout || true' }
  }
}
