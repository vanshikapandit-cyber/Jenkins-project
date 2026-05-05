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

                powershell -Command "Get-ChildItem -Recurse -Filter *.js | Where-Object { $_.FullName -notmatch '\\\\node_modules\\\\' -and $_.FullName -notmatch '\\\\encrypted\\\\' } | ForEach-Object { (Get-Content $_.FullName) -replace 'console.log', 'ENC_LOG' | Set-Content $_.FullName }"

                php obfuscate.php -i . -o encrypted --skip encrypted,node_modules,.git
                '''
            }
        }

    stage('Push to Encrypted Branch') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'github_creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
            bat '''
            git config user.name "jenkins"
            git config user.email "jenkins@gmail.com"

            git checkout -B encrypted

            git add encrypted
            git commit -m "Encrypted code" || echo No changes

            git push "https://%GIT_TOKEN%@github.com/vanshikapandit-cyber/Jenkins-project.git" encrypted --force --verbose
            '''
        }
    }
   }

    }
}