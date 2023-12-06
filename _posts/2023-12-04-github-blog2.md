---

title: Github 블로그 생성(Chirpy Theme) 2
date: 2023-12-04 22:56:00 +09:00
categories: [ Life, Daily ]
tags: [	GithubBlog,  jekyll ]
    
---

## 문제 해결(빌드 오류)

### Home 페이지 오류

  > --- layout: home # Index page --- 이 보이는 현상
  
- Github 페이지 설정 변경
  
  - Settings - Pages - Build and deployment에서 소스를 Github Actions로 변경
  - Jekyll - Configure 버튼 클릭
  - 별도의 수정없이 Commit change... 선택
  - Commit changes 버튼 클릭

### Home 화면에 포스트 안 보임

- _layouts 폴더 속 home.html 편집

  - {% for post in posts %} -> {% for post in **site.posts** %}

  ```html
    ...
    <div id="post-list" class="flex-grow-1 px-xl-1">
      {% for post in site.posts %}
        <article class="card-wrapper card">
    ...
  ```
    
### 빌드 실패 Setup Ruby

> Error: The Process 'opt/hostedtoolcache/Ruby/3.2.2/x64/bin/bundle' failed with exit code 16
 
- gmefile.lock의 문제로 다음 명령어 사용

  ```shell
    bundle lock --add-platform x86_64-linux
  ```

- git에 반영

  ```git bash
    git pull
    git add .
    git commit -m 'Init Gemfile.lock'
    git push -u origin main      
  ```

### 빌드 실패 Test Site

> internal script /assets/js/dist/page.min.js does not exit .. 이런 내용들
  
- Node.js 설치([버전(16.20.2) x64 다운로드(msi)](https://nodejs.org/download/release/v16.20.2/node-v16.20.2-x64.msi))
  
- 설치 후 command 창에서 다음 명령 실행

  ```command
    npm install
    npm run build
  ```

  - 실행 중 다음 오류 발생 시 추가 명령 실행 후

    > 'NODE_ENV'은(는) 내부 또는 외부 명령, 실행할수 있는 프로그램, 또는 배치파일이 아닙니다

    ```command
      npm install -g win-node-env
      npm run build
    ```
        
- .gitignore 파일 수정  
  
  - assets/js/dist 부분을 주석처리(맨 앞에 '#' 추가)

- git에 반영

  ```git bash
    git add .
    git commit -m 'Update .gitignore'
    git push -u origin main      
  ```