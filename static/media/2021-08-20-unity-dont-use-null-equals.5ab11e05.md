# Overview
취미로 개발 중인 게임에서 C#에서 제공하는 Null Conditional 연산자를 통해서 nullable한 프로를티의 사용을 제한하는 방식으로 NPE의 위험성을 피하려고 했다.

```c#
...
[SerializeField]
private Transform targetTransform;

void Awake() {
	targetTransform?.SetActive(false);
}
...
```

하지만 게임을 실행하고 NPE<sup>Unssigned Reference Exception</sup>가 발생하게 되었다.

# Problem
결과적으로 유니티에선 현재 `UnityEngine.Object`를 상속받는 클래스에 대해선 NCO<sup>Null Conditional Operator</sup>가 지원되지 않는다. `UnityEngine.Object`는 순수 C# 오브젝트가 아니기 때문에 유니티에서 그와 관련된 `==`, `=!` 연산자는 오버라이딩하고 있기 때문이다.

때문에 C#에서 지원하는 `?.`, `??`와 같은 NCO는 `UnityEngine.Object`에 대해서는로 제대로 동작하지 않는다.

> 유니티 오브젝트는 native C++ 오브젝트를 랩핑하고 있다. 유니티 오브젝트가 C++ 오브젝트를 포인팅하고 있기 때문에 `Destory(obj)` 로 게임 오브젝트를 삭제하는 경우 C++ 오브젝트에 `null` 이 할당되더라도, 유니티 오브젝트는 `null`을 포인트 하는 오브젝트가 되기 때문에 실제 랩핑한 오브젝트가 `null`인지 확인하기 위해서 `==` 연산자를 오버라이딩하여 포인팅한 네이티브 오브젝트가 `null`인지 확인하도록 되어있다.

# Solution
## Unity 오브젝트가 아닌경우
위의 문제점에서 언급한 것과 같이 유니티에서 제공하는 오브젝트가 아닌 경우에는 NCO를 사용하는데 문제가 되지 않는다. 때문에 코드를 깔끔하게 표현하고 싶을 때는 유니티 오브젝트가 아닌 인스턴스에 대해서 NCO를 사용하는 것은 문제가 되지 않는다.

## Unity 오브젝트의 경우
### 프로퍼티의 초기세팅을 할 때 사용
일반적으로 프로퍼티는 유니티 에디터의 인스펙터에서 세팅이 되는 것이 일반적이지만, 초기화시에 `GetComponent()` 메서드 등을 통해 초기화를 하는 경우도 존재한다.

NCO의 경우 유니티 오브젝트에 대해서 사용할 수 없기 때문에 다음과 같이 사용할 수 있다.

```c#
...
[SerializeField]
private CustomGameObject target;

void Awake() {
	if (target == null)
		target = GetComponent<CustomGameObject>();
}
...
```

혹은 좀 더 간단하게 표현하기 위하 아래와 같은 표현도 가능하다.

```c#
...
[SerializeField]
private CustomGameObject target;

void Awake() {
	if (?target)
		target = GetComponent<CustomGameObject>();
}
...
```

### Optional한 기능을 제공할 때
처음 초기 세팅 뿐만 아니라 몇몇 프로퍼티를 nullable한 값으로 설정하고 `Update()` 등의 메서드에서 로직을 수행할 때 프로퍼티의 설정의 유무에 따라 부가적인 기능으로 이용하려고 하는 경우가 있다.

```c#
[SerializeField]
private CustomGameObject optionalObj;

void Update() {
	if (optionalObj == null)
		target.doSomething();
}
...
```

위와 같은 방식으로 작성할 수 있겠지만, 역시나 성능 이슈가 존재한다. 때문에 유니티에선 `null` 체크를 최소화할 필요가 있다.

때문에 부가적인 기능을 제공하는 경우 스크립트를 따로 작성하여 Component를 추가했을때 해당 기능이 동작하도록 하는 것을 권장하고 싶다. 이런식으로 개발하는 것이 `null`과 관련된 처리에 대한 성능 문제 등을 피하면서 확장하기 쉬운 구조로 개발하는 것에 도움이 된다.

# One More Step
실제 `UnityEngine.Object`의 구현을 보면 다음과 같다.

```c#
public static bool operator==(Object x, Object y) { return CompareBaseObjects(x, y); }
public static bool operator!=(Object x, Object y) { return !CompareBaseObjects(x, y); }
// Does the object exist?
public static implicit operator bool(Object exists)
{
    return !CompareBaseObjects(exists, null);
}
static bool CompareBaseObjects(UnityEngine.Object lhs, UnityEngine.Object rhs)
{
    bool lhsNull = ((object)lhs) == null;
    bool rhsNull = ((object)rhs) == null;
    if (rhsNull && lhsNull) return true;
    if (rhsNull) return !IsNativeObjectAlive(lhs);
    if (lhsNull) return !IsNativeObjectAlive(rhs);
    return lhs.m_InstanceID == rhs.m_InstanceID;
}
```