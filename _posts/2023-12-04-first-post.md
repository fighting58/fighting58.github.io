---
title: 첫 포스트
date: 2023-12-04 21:56:00 +09:00
categories: [Life, Daily]
tags:
  [
    GithubBlog,
    jekyll,
  ]
---

## 첫 포스트 생성 

- [프로의 개발일지](https://devpro.kr/posts/Github-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-(1)/) 참조

## 설치 및 테스트 

- 루비 설치
- jekyll 설치, bundle 설치
- git clone
- username.github.io폴더로 이동(생성된 폴더에 내용이 있으면 삭제)
- jekyll new ./ 
- bundle install, bundle update, bundle install
- bundle exec jekyll serve
- http://127.0.0.1:4000/으로 접속
- Welcome to Jekyll! 이라는 사이트에 문구 확인

## 테마 다운로드 

- [jekyll themes](https://jekyllthemes.org/) 이동 --> chirpy 테마 다운로드
- 압축을 풀어서 루트 폴더에 복사(파일이 있으면 덮어쓰기)
  - Gemfile.lock 파일 삭제
  - .travis.tml 파일 삭제
  - _posts 디렉토리 삭제
  - docs 디렉토리 삭제
  - .github/workflows/pages-deploy.yml.hook 파일을 제외한 나머지 파일 삭제
  - .github/workflows/pages-deploy.yml.hook 파일명을 pages-deploy.yml로 변경
- bundle install
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
- bundle exec jekyll serve 명령어를 입력

## 빌드 및 배포 

- github에 파일 업로드하고, 자동 빌드 및 배포

```Shell
    git add -A                          // 모든 수정 파일을 추가합니다.
    git status                          // 파일 변경사항을 확인합니다.
    git commit -m "원하는 커밋 제목"     // 커밋을 메시지를 작성합니다.
    git push    
```
- git add 과정에서 경고 시 [LF will be replaced by CRLF 경고 해결](https://devpro.kr/posts/LF-will-be-replaced-by-CRLF-%EA%B2%BD%EA%B3%A0-%ED%95%B4%EA%B2%B0/) 참조

```Shell
    warning: in the working copy of '2023-04-11-첫 번째 포스팅.md', 
    LF will be replaced by CRLF the next time Git touches it
```

- 해결책: 아래의 명령어을 적용 후, 다시 git add를 수행

```Shell
    git config --global core.autocrlf true

```