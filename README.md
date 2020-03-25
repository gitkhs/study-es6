# study-es6

## 객체지향 자바스크립트

객체지향 언어는 다형성(polymorphism)을 지원한다.

* 대체가능성: 다른 형(type)으로 대체가 가능.

* 내적동질성: 동일한 메소드 존재시 탄생된 타입의 값을 우선한다.

### 자바

```java
class A {
    public void print() {
        System.out.println("A");
    }
    public void run() {
        this.print();
    }
}
class B extends A {
    public void print() {
        System.out.println("B");
    }
}

A a = new B();
a.run();
```

### 자바스크립트

```javascript
function A() {}
A.prototype.print = function() {
  console.log('A');
};
A.prototype.run = function() {
  this.print();
};

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.print = function() {
  console.log('B');
};

var a = new B();
a.run();
```

## ECMAScript 6

### 변수의 선언

* let

* const

```javascript
var v1 = true;
function A() {
  var v2 = 2;
}
console.log(v1);  // true
console.log(v2);  // v2 is not defined

if(v1) {
  var v10 = 10;
  let v20 = 20;
  const v30 = 30;

  v20 = 0;  // 재할당 가능
  v30 = 0;  // 재할당 불가
}
console.log(v10);  // 10
console.log(v20);  // v20 is not defined
console.log(v30);  // v30 is not defined
```

### 템플릿 문자 리터럴

백틱(`)을 사용하며, 에디터상의 줄바꿈이 그대로 표현 된다. 문자열 안의 내용을 다른 값으로 치환이(${}) 가능하다.

```javascript
var name = '홍길동';
var age = 100
var template = `이름: ${name}
나이: ${age}
`;
```

### 디스트럭처링, 스트레드 연산자

* 객체의 해체

* 배열의 해체

* 펼침 연산자

```javascript
const obj = {a:1, b:2};
const {a, b} = obj;

const arr = [1, 2, 3];
const ex = [10, 11, ...arr];
const [v1, v2] = ex;
```

### 함수

* 디폴트 매개변수

* 나머지 변수

* 화살표 함수

```javascript
function f1(arg=1) {
  console.log(arg);
}
function f2(...arg) {
  console.log(arg);
}
var f3 = (v1=1, ...v2)=> {
  console.log(v1, v2);
};
var f4 = v=> v+1;
```

### 클래스

`class` 키워드를 사용하며, 생성자는 `constructor` 메소드를 이용한다.
`extends` 키워드를 사용하여 상속이 가능하며 다중 상속은 지원하지 않는다.
`get, set` 키워드를 이용하여 객체의 속성값 처럼 사용할 수 있다.

```javascript
class A {
  print() {
    console.log('A');
  }
  run() {
    this.print();
  }
}

const B = class extends A {
  constructor() {
    this._value = 1;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  print() {
    console.log('B');
  }
};

const b = new B();
b.run();
```

### 제너레이터 함수

`function *` 키워드를 사용하며, 함수의 실행을 잠시 중단 하거나, 내부의 상태를 관리 할 수 있다.

```javascript
function* gen() {
  const arr = [1, 2];
  let v;
  while(v=arr.pop()) yield v;
}

var v = gen();
while({value, done}=v.next()) {
  if(!done) console.log(value);
}
```

### 프록시

객체의 기본동작을 재정의 하기 위해 사용.

```javascript
var target = {};
var p = new Proxy(target, {});
p.a = 37;

console.log(target.a);
```

## 샘플

* [es6 샘플](https://gitkhs.github.io/study-es6/src/sample.html)
* [todo list](https://gitkhs.github.io/study-es6/src/todo.html)
* 코드연습 [수정전](https://code.dcoder.tech/files/code/5e795f738f29013b25d3e65f/refactoring_old) ->
[수정후](https://code.dcoder.tech/files/code/5e79606a8f29013b25d3e690/refactoring_new)
