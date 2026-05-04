pipeline {
    agent any 

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/vanshikapandit-cyber/Jenkins-project.git'
            }
        }

        stage('Clean Encrypted Folder Only') {
            steps {
                bat '''
                IF EXIST encrypted (rmdir /s /q encrypted)
                '''
            }
        }

        stage('Encrypt Code') {
            steps {
                bat '''
                mkdir encrypted

                php obfuscate.php -i . -o encrypted --skip encrypted,node_modules,.git

                for /R encrypted %%f in (*.js) do (
                    powershell -Command "(Get-Content %%f) -replace 'console.log','ENC_LOG' | Set-Content %%f"
                )
                '''
            }
        }

stage('Push to Encrypted Branch') {
    stage('Push to Encrypted Branch') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'github_creds', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
            bat '''
            git config user.name "jenkins"
            git config user.email "jenkins@gmail.com"

            git checkout -B encrypted

            git add encrypted
            git commit -m "Encrypted code" || echo No changes

            git push https://%USER%:%TOKEN%@github.com/vanshikapandit-cyber/Jenkins-project.git encrypted --force --verbose
            '''
        }
    }
}

    }
}