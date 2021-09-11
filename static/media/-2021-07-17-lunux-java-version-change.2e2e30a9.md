https://carfediem-is.tistory.com/6

난 지금 javac와 java가 바라보는 jdk가 서로 달라

javac 의 버전은 1.8

[root@ip-172-31-9-0 ~]# javac -version

javac 1.8.0_151



java 의 버전은 1.7 

[root@ip-172-31-9-0 ~]# java -version

java version "1.7.0_151"

OpenJDK Runtime Environment (amzn-2.6.11.0.74.amzn1-x86_64 u151-b00)

OpenJDK 64-Bit Server VM (build 24.151-b00, mixed mode) 



그럼 javac가 어디있는지 찾아볼까?

javac 위치 확인



[root@ip-172-31-9-0 ~]# which javac

/usr/bin/javac



[root@ip-172-31-9-0 ~]# readlink -f /usr/bin/javac

/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.35.amzn1.x86_64/bin/javac



  → javac의 실제 위치는 /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.35.amzn1.x86_64/bin/

  → 따라서 java의 링크를 /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.35.amzn1.x86_64/bin/java 로 설정해야 함



* which = 특정명령어의 위치를 찾아주는 명령어

* readlink -f = 심볼릭 링크의 원본을 찾아주는 명령어




---

현재 java 버전 확인
```terminal
$ java -version
java version "1.7.0_151"
OpenJDK Runtime Environment (amzn-2.6.11.0.74.amzn1-x86_64 u151-b00)
OpenJDK 64-Bit Server VM (build 24.151-b00, mixed mode)
```

현재 java 링크 걸린거 확인
```terminal
$ ll -a /usr/bin/java
lrwxrwxrwx 1 root root 22 Dec  7 04:46 /usr/bin/java -> /etc/alternatives/java
```

"/usr/bin/java" 의 링크 끊기
```terminal
$ unlink /usr/bin/java
```

"/usr/bin/java" link 재연결
```terminal
javac가 있는 위치에 있는 java가 실행되도록 한다.
$ ln -s /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.35.amzn1.x86_64/bin/java /usr/bin/java
```

다시 java 버전 확인
```terminal
$ java -version
openjdk version "1.8.0_151"
OpenJDK Runtime Environment (build 1.8.0_151-b12)
OpenJDK 64-Bit Server VM (build 25.151-b12, mixed mode)
```

---

위와같이 많이 설정을 하는데, 그냥 환경 변수 설정을 하는것이 좋은 것 같다.

'~/.bashrc' 에 환경 변수를 설정 할 수 있다.

라인에서 사용하는 서버에는 기본적으로 다음과 같이 쓰여있다.

```vi
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
```

해당 파일에 사용하려는 자바의 버전의 디렉토리가 irteam/apps/jdk라고 했을때, 다음의 환경 변수를 추가하면 된다.

```vi
export APP_HOME=/home1/irteam
export JAVA_HOME=${APP_HOME}/apps/jdk
export PATH=${JAVA_HOME}/bin:$PATH
```

JAVA_HOME을 설정한 후 `java -version`을 호출하더라도 버전이 업데이트한 버전으로 보여지지 않는 경우가 있다. 그렇다면 다음 링크...
https://stackoverflow.com/questions/10687093/java-home-and-java-version