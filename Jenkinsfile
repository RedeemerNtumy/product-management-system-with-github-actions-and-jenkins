pipeline {
    agent any
     environment {
            TEST_PORT = '8081'
        }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'mvn clean install -DskipTests'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'mvn test -Dtest.port=${TEST_PORT}'
            }
        }
        stage('Start Backend Service') {
            steps {
                sh '''
                    # Command to start your backend service
                    nohup java -jar target/Products-0.0.1-SNAPSHOT.jar &
                    sleep 30  # Give the service some time to start up
                '''
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'
            script {
            def jobName = env.JOB_NAME
            def buildNumber = env.BUILD_NUMBER
            def pipelineStatus = currentBuild.result ?: 'UNKNOWN'
            def bannerColor = pipelineStatus.toUpperCase() == 'SUCCESS' ? 'green' : 'red'
            def body = """
            <html>
            <body>
            <div style="border: 4px solid ${bannerColor}; padding: 10px;">
            <h2>${jobName} - Build ${buildNumber}</h2>
            <div style="background-color: ${bannerColor}; padding: 10px;">
            <h3 style="color: white;">Pipeline Status: ${pipelineStatus.toUpperCase()}</h3>
            </div>
            <p>Check the <a href="${env.BUILD_URL}">console output</a>.</p>
            </div>
            </body>
            </html>
            """
            emailext (
            subject: "${jobName} - Build ${buildNumber} - ${pipelineStatus.toUpperCase()}",
            body: body,
            to: 'ntumyredeemer@gmail.com',
            from: 'jenkins@example.com',
            replyTo: 'jenkins@example.com',
            mimeType: 'text/html'
            attachmentsPattern: 'target/surefire-reports/*.xml'
            )
            }
        }
    }
}