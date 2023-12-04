---
title:  "코딩테스트를 위한 Python 정리"
excerpt: "코딩테스트 문제를 해결하면서 정리한 Cheat Sheet"

categories:
  - Python
tags:
  - [Python]

permalink: /python/for-coding-test/

toc: true
# toc_sticky: true

date: 2023-12-04
last_modified_at: 2023-12-04
---

문제를 풀면서 자주 찾아보거나 기억할 만한 내용 정리하기
2022.03.07 ~ 추가중

## 자료형과 내장 함수

### 정수형, 실수형, 복소수형

python에서는 소수점 붙인 수를 대입하면 실수형으로 처리

```python
a = 5.
b = .7
print(a) # 5.0
print(b) # 0.7
print(type(a)) # <class 'float'>
print(type(b)) # <class 'float'>
```

#### 실수 표현 정확도 한계
```python
a = 0.3 + 0.6
if a == 0.9:
  print(True)
else:
  print(False)
 # 결과 : False
```

해결 방법 : round 함수 권장
