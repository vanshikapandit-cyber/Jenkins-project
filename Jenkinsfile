pipeline {
    agent any 

    stages {

        stage('Encrypt Code') {
            steps {
                bat '''
                IF EXIST encrypted (rmdir /s /q encrypted)
                mkdir encrypted

                php obfuscate.php -i . -o encrypted --skip encrypted,node_modules,.git

                for /R encrypted %%f in (*.js) do (
                    powershell -Command "(Get-Content %%f) -replace 'console.log','ENC_LOG' | Set-Content %%f"
                )
                '''
            }
        }

        stage('Push to Encrypted Branch') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'github_creds', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
            bat '''
            git config user.name "jenkins"
            git config user.email "jenkins@gmail.com"

            git checkout -B encrypted

            git add encrypted
            git diff --quiet || git commit -m "Encrypted code"

            git push https://%USER%:%TOKEN%@github.com/vanshikapandit-cyber/Jenkins-project.git encrypted --force
            '''
        }
    }
    }
    
    }
}