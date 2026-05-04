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
                sh '''
                rm -rf encrypted
                mkdir encrypted

                php tools/obfuscate.php -i . -o encrypted --skip encrypted,node_modules,.git

                # Optional extra JS encryption
                find encrypted -type f -name "*.js" -exec sed -i 's/console.log/ENC_LOG/g' {} \\;
                '''
            }
        }

        stage('Push to Encrypted Branch') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'USER', passwordVariable: 'TOKEN')]) {
                    sh '''
                    git config user.name "jenkins"
                    git config user.email "jenkins@gmail.com"

                    git checkout -B encrypted
                    git add .
                    git commit -m "Encrypted code" || echo "No changes"

                    git push https://$USER:$TOKEN@github.com/vanshikapandit-cyber/Jenkins-project.git encrypted --force
                    '''
                }
            }
        }
    }
}