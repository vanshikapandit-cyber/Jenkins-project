pipeline {
    agent any 

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/vanshikapandit-cyber/Jenkins-project.git'
            }
        }

        stage('Encrypt Code') {
            steps {
                bat '''
                rmdir /s /q encrypted
                mkdir encrypted

                php obfuscate.php -i . -o encrypted

                REM Example encryption
                for /r encrypted %%f in (*.js) do (
                    powershell -Command "(Get-Content %%f) -replace 'console.log','ENC_LOG' | Set-Content %%f"
                )
                '''
            }
        }

        stage('Push to Encrypted Branch') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
                    bat '''
                    git config user.name "jenkins"
                    git config user.email "jenkins@gmail.com"

                    git checkout -B encrypted
                    git add .
                    git commit -m "Encrypted code" || echo No changes

                    git push https://%USER%:%TOKEN%@github.com/vanshikapandit-cyber/Jenkins-project.git encrypted --force
                    '''
                }
            }
        }
    }
}