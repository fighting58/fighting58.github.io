---

title: Github 블로그 생성(Chirpy Theme) 1
date: 2023-12-04 21:56:00 +09:00
categories: [ Life, Daily ]
tags: [	GithubBlog,  jekyll ]
    
---

## Github 페이지 생성

- 생성 방법은 생략
- default branch: main으로 설정

## 프로그램 설치 및 테스트 

- 루비 설치

  - [루비 다운로드 페이지](https://rubyinstaller.org/downloads/)
  - 3.1.X 버전을 권장
  
- jekyll 설치, bundle 설치

  ```shell
    gem install jekyll
    gem install bundler
  ```
  
- git clone
- username.github.io폴더로 이동

  - 기존 자료가 있으면 백업 후 폴더내용 비우기
  
- jekyll 사이트 생성

  ```Shell
    jekyll new ./

    bundle install
    bundle update
    bundle install
  ```
  
- 설치 확인(로컬 서버 실행)

  ```Shell
    bundle exec jekyll serve
  ```
  
  - 실행 중 **webrick**을 찾을 수 없다는 에러 시, 아래 커맨드 실행 후 다시 서버 실행

    ```Shell
      bundle add webrick
    ```
  - http://127.0.0.1:4000/으로 접속
  - Welcome to Jekyll! 이라는 사이트에 문구 확인

## Chirpy 테마 다운로드 

- [jekyll themes 다운로드(zip)](https://github.com/cotes2020/jekyll-theme-chirpy/archive/master.zip)
- 압축을 풀어서 루트 폴더에 복사(파일이 있으면 덮어쓰기)

  - Gemfile.lock 파일 삭제
  - .travis.tml 파일 삭제
  - _posts 디렉토리 삭제(테스트용으로 남겨두어도 무방)
  - docs 디렉토리 삭제
  - .github/workflows/pages-deploy.yml.hook 파일을 제외한 나머지 파일 삭제
  - .github/workflows/pages-deploy.yml.hook 파일명을 pages-deploy.yml로 변경

- 블로그 설정 변경
- lang:	웹 페이지의 언어를 선택합니다. 지원하는 언어의 종류는 /_data/locales/ 에서 확인하실 수 있습니다.

  - timezone:	Timezone 설정입니다. 한국에 거주하신다면 Asia/Seoul을 입력해주세요.
  - title:	블로그의 타이틀 입니다.
  - tagline:	블로그의 서브 타이틀 입니다.
  - description:	자세히는 모르겠으나… 블로그 소개 적으시면 될 듯 합니다.
  - url:	"https://{my_github_username}.github.io" 형식으로 적어주세요.
  - github_username:	자신의 github username을 적으면 됩니다.
  - social_name:	자신의 이름이나 닉네임을 적으시면 됩니다.
  - social_email:	자신의 이메일 주소를 적습니다.
  - social_links:	자신의 소셜 링크 주소를 적습니다.
  - avatar:	자신의 프로필 사진 링크를 적어주시면 됩니다. 주로 /assets/img/ 디렉토리 안에 이미지를 저장합니다.
  - paginate:	메인화면 한 페이지에 보여줄 게시글 갯수를 정합니다.

- root 디렉토리에 _posts 디렉토리를 생성
- _posts 디렉토리 안에 YYYY-MM-DD-포스팅 제목.md 형식으로 마크다운 파일을 생성


  ```Markdown  
    ---
    title: 포스팅 제목
    date: YYYY-MM-DD HH:MM:SS +09:00
    categories: [메인 카테고리, 서브 카테고리]
    tags:
    [
        태그1,
        태그2,
        태그3,
        .
        .
        .
    ]
    ---

  ```
  
- 로컬 서버에서 확인

  ```Shell
    bundle exec jekyll serve
  ```

## 빌드 및 배포 

- github에 파일 업로드하고, 자동 빌드 및 배포

  ```Shell
      git add -A                          // 모든 수정 파일을 추가합니다.
      git status                          // 파일 변경사항을 확인합니다.
      git commit -m "원하는 커밋 제목"     // 커밋을 메시지를 작성합니다.
      git push    
  ```
- git add 과정에서 경고 시 **LF will be replaced by CRLF 경고 해결**

  ```Shell
      warning: in the working copy of '2023-04-11-첫 번째 포스팅.md', 
      LF will be replaced by CRLF the next time Git touches it
  ```

  - 해결책: 아래의 명령어을 적용 후, 다시 git add를 수행

  ```Shell
      git config --global core.autocrlf true
  ```

## 문제 해결(빌드 오류)

### Home 페이지 오류

  > --- layout: home # Index page --- 이 보이는 현상
  
- Github 페이지 설정 변경
  
  - Settings - Pages - Build and deployment에서 소스를 Github Actions로 변경  
  - Jekyll - Configure 버튼 클릭  
  - 별도의 수정없이 **Commit change...** 선택 
  - Commit changes 버튼 클릭  

### Home 화면에 포스트 안 보임  

- _layouts 폴더 속 home.html 편집  

- 중간에 &#123;&#37; for post in posts &#37;&#125;를 &#123;&#37; for post in site.posts &#37;&#125;로 수정

```html
  <div id="post-list" class="flex-grow-1 px-xl-1">  
    { % for post in site.posts % }   <!-- '{', '}'과 '%' 사이에 공백이 없는 것이 맞음.  -->
      <article class="card-wrapper card">  
```
    
### 빌드 실패 Setup Ruby

> Error: The Process 'opt/hostedtoolcache/Ruby/3.2.2/x64/bin/bundle' failed with exit code 16  
 
- gmefile.lock의 문제로 다음 명령어 사용  

```shell
  bundle lock --add-platform x86_64-linux
```

- git에 반영  

```shell
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

    > NODE_ENV은(는) 내부 또는 외부 명령, 실행할수 있는 프로그램, 또는 배치파일이 아닙니다  

    ```command
      npm install -g win-node-env
      npm run build
    ```
        
- .gitignore 파일 수정  
  
  - assets/js/dist 부분을 주석처리(맨 앞에 '#' 추가)  

- git에 반영  

  ```shell
    git add .
    git commit -m 'Update .gitignore'
    git push -u origin main      
  ```

