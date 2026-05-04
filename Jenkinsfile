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
                bat '''
                git config user.name "jenkins"
                git config user.email "jenkins@gmail.com"

                git checkout -B encrypted origin/master

                git add encrypted
                git diff --quiet || git commit -m "Encrypted code"

                git remote set-url origin https://github.com/vanshikapandit-cyber/Jenkins-project.git

                git push origin encrypted --force
                '''
            }
        }

    }
}