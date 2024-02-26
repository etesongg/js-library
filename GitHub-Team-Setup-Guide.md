### 로컬 저장소 초기화하기 (git init):
프로젝트 디렉토리로 이동한 후, 터미널에서 git init 명령어를 실행하여 새로운 Git 저장소를 초기화합니다. 이 과정은 해당 디렉토리에 Git 추적을 시작하게 합니다.

### 원격 저장소 추가하기 (git remote add):
GitHub에서 생성한 원격 저장소(URL이 https://github.com/etesongg/js-library/인 경우)를 로컬 저장소에 연결합니다. 터미널에서 git remote add origin https://github.com/etesongg/js-library/ 명령어를 사용합니다.

### main 브랜치로 전환하기 (git checkout):
최신 main 브랜치의 내용을 기반으로 작업하기 위해 git checkout main 명령어를 실행합니다.

### han 브랜치 생성 및 전환하기 (git checkout -b):
${서브 브랜치명} 브랜치를 새로 생성하고 해당 브랜치로 전환합니다. git checkout -b ${서브 브랜치명} 명령어를 실행합니다.

### 작업 후 변경사항 커밋하기:
작업한 내용을 스테이지에 추가합니다. git add . 명령어를 사용하여 모든 변경사항을 스테이지에 추가할 수 있습니다.
git commit -m "커밋 메시지" 명령어로 변경사항을 커밋합니다.

### 변경사항을 GitHub에 푸시하기 (git push):
${서브 브랜치명} 브랜치의 변경사항을 원격 저장소에 푸시합니다. git push -u origin ${서브 브랜치명} 명령어를 사용합니다.

이 과정을 통해 로컬에서 작업을 시작하고, GitHub에 변경사항을 푸시할 수 있습니다.