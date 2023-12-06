---

title: Github 블로그 생성(Chirpy Theme)
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

  ```shell
    jekyll new ./

    bundle install
    bundle update
    bundle install
  ```
  
- 설치 확인(로컬 서버 실행)

  ```shell
    bundle exec jekyll serve
  ```
  
  - 실행 중 **webrick**을 찾을 수 없다는 에러 시, 아래 커맨드 실행 후 다시 서버 실행

    ```shell
      bundle add webrick
    ```
  - http://127.0.0.1:4000/으로 접속
  - Welcome to Jekyll! 이라는 사이트에 문구 확인
