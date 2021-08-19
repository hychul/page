- 유니티 Null 체크는 c++(네이티브 객체), c# (유니티 객체). 두 곳 모두에 Null을 체크한다.
- 때문에 정확하지만 느리다.
- 싱글턴 같이 정적 클래스의 null 체크는 네이티브 객체만 비교하면 약 3배 더 빠르다

https://overworks.github.io/unity/2019/07/16/null-of-unity-object.html
https://swifter22.tistory.com/26
https://jacx.net/2015/11/20/dont-use-equals-null-on-unity-objects.html
