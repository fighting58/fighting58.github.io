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
  - 별도의 수정없이 **Commit change...** 선택
  - Commit changes 버튼 클릭

### Home 화면에 포스트 안 보임

- _layouts 폴더 속 home.html 편집

  - {% for post in posts %} -> {% for post in **site.posts** %}

  ```html
    <div id="post-list" class="flex-grow-1 px-xl-1">
      {% for post in site.posts %}
        <article class="card-wrapper card">
  ```
    
