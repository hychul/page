JPA를 사용한 프로젝트에서 엔티티를 구현할 때 Java Persistence<sup>[1](#java_persistence_doc)</sup>에 의해서 빈 생성자가 필요하다.

때문에 Kotlin을 사용하여 이를 구현할때, 다음과 같이 모든 필드에 대해서 nullable 한 값의 멤버변수를 사용하여 만들어야 했다.

1. kotlin-jpa 플러그인을 사용하면 non-null 멤버변수를 생성자 초기화를 통해 사용할 수 있다.
2. IntelliJ [Tools]-[Kotlin]-[Show Kotlin Bytecode] 을 통해 변환하여 decompile 하여 코드를 확인하면 기본 생성자가 자동으로 추가된 것을 알 수 있다.

<a name="java_persistence_doc">1</a> : "The entity class must have a no-arg constructor. The entity class may have other constructors as well. The no-arg constructor must be public or protected." of https://download.oracle.com/otndocs/jcp/persistence-2_1-fr-eval-spec/index.html

ref : https://blog.sapzil.org/2017/11/02/kotlin-jpa-pitfalls/