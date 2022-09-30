describe("About Arrays", function () {
  //We shall contemplate truth by testing reality, via spec expectations.
  it("should create arrays", function () {
    var emptyArray = [];
    expect(typeof emptyArray).toBe("object"); //A mistake? - http://javascript.crockford.com/remedial.html
    expect(emptyArray.length).toBe(0);

    var multiTypeArray = [
      0,
      1,
      "two",
      function () {
        return 3;
      },
      { value1: 4, value2: 5 },
      [6, 7],
    ];
    expect(multiTypeArray[0]).toBe(0);
    expect(multiTypeArray[2]).toBe("two");
    expect(multiTypeArray[3]()).toBe(3);
    expect(multiTypeArray[4].value1).toBe(4);
    expect(multiTypeArray[4]["value2"]).toBe(5);
    expect(multiTypeArray[5][0]).toBe(6);
  });

  it("should understand array literals", function () {
    var array = [];
    expect(array).toEqual([]);

    array[0] = 1;
    expect(array).toEqual([1]);

    array[1] = 2;
    expect(array).toEqual([1, 2]);

    array.push(3);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should understand array length", function () {
    /* Array.length 속성 (Array인스턴스의 length속성): ----------
    (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
    1-1. 배열의 길이를 반환한다. (length속성은) 1부터 센다.
    1-2. 주의! 배열의 인덱스가 0부터 시작인거고, length속성은 1부터 센다.
    2-1. 빈 배열의 length는 0이다. 당연하다! 배열이 없으니까, 존재하는 길이도 없기 때문이다(=셀 수 있는 배열이 없음). 
    2-2. 예시:
    arr1 = []
    console.log(arr1.length) // 0 */
    var fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4);
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(6);

    /* Array() 생성자 ('배열 생성자'): ----------
    (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
    1-1. (Array() 생성자는) 새로운 Array객체를 생성할 때 사용한다.
    1-2. new Array() 형태로 사용한다.
    2-1. 예시 1-1: 단일 매개변수를 넣을 경우
    let fruits = new Array(2)
    console.log(fruits.length) // 2
    console.log(fruits[0]) // undefined
    -생성자의 단일 매개변수로 숫자를 넣으면, 해당 숫자만큼의 길이(length)를 가진 빈 배열을 반환한다.
    2-2. 예시 1-2: 단일 매개변수를 넣을 경우
    let fruits = new Array('사과')
    console.log(fruits.length) // 1
    console.log(fruits[0]) // "사과"
    -단일 매개변수로 숫자 외 문자열 등을 넣을 수도 있다! 그 때는 해당 매개변수를 원소로 하는 새로운 배열이 생성된다.
    2-3. 예시 2: 복수 매개변수를 넣을 경우 
    let fruits = new Array('사과', '바나나')
    console.log(fruits.length) // 2
    console.log(fruits[0]) // "사과" 
    -생성자에 두 개 이상의 매개변수를 넣으면, 해당 매개변수들을 원소로 하는 새로운 배열이 생성된다. 
    복수 매개변수로 문자열 외에 숫자 등을 넣을 수도 있다. */

    /* 배열의 길이(length) 줄여보기: ----------
    1. 예시1의 길이(length)를 예시2에서 줄여보겠다.
    -예시1
    let foo = new Array('가', '나', '다', '라', '마')
    console.log(foo.length) // 5
    console.log(foo[0]) // "가"
    console.log(foo[3]) // "라"
    -예시2
    foo.length = 3
    console.log(foo.length) // 3
    console.log(foo[0]) // "가"
    console.log(foo[3]) // undefined */
    var tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(10);

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5);
  });

  /* array.slice() 메서드: ----------
  (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice, https://www.daleseo.com/js-array-slice-splice/)
  1. 형태: arr.slice(begin, end)
  -배열을 잘라 새로운 배열 객체로 반환한다(=새로운 배열로 반환). 원본 배열을 바꾸지는 않는다.
  -begin(시작지점): 추출을 시작할 인덱스 위치 지정. 어디서부터 배열을 자르기 시작할지를 정한다. 배열의 인덱스처럼 0부터 시작한다.
  -end(종료지점): 추출을 종료할 인덱스 위치 지정. 어디까지 배열을 자를지를 지정한다. 
  종료지점은 생략 가능하다(시작지점만 넣을 수 있음). 생략할 경우 해당 배열 끝까지 추출할 것을 의미한다.
  -주의! 시작지점 인덱스는 설정한 지점을 '포함'해서(거기서부터) 시작하나, 종료지점 인덱스는 설정한 인덱스를 '제외'한, 해당 인덱스 '이전' 지점까지를 자른다. 
  1-2. end(종료지점) 설정 관련
  -종료지점 인덱스가 원본 배열의 길이를 초과하면, 해당 배열 끝까지를 반환한다.
  -시작지점과 종료지점의 인덱스를 조합했을 때, 해당되는 원본 배열이 없으면 빈 배열([])을 반환한다.
  1-3. 지점 인덱스를 설정하지 않은 경우
  (=시작지점 혹은 시작지점 + 종료지점 등 인덱스 설정을 하지 않았을 경우)
  -형태: sampleArr.slice())
  -원본 배열 전체를 복사해 반환한다.
  -예시:
  let sampleArr = [1, 2, 3, 4, 5]
  console.log(sampleArr.slice()) // [1, 2, 3, 4, 5]
  2. 예시
  let fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
  let citrus1 = fruits.slice(1, 3)
  let citrus2 = fruits.slice(3)
  console.log(citrus1) // ['Orange', 'Lemon']
  console.log(citrus2) // ['Apple', 'Mango'] */

  /* slice() 대 splice(): ---------- 
  1.형태: array.slice(), array.splice() */
  it("should slice arrays", function () {
    var array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(["peanut"]);
    expect(array.slice(0, 2)).toEqual(["peanut", "butter"]);
    expect(array.slice(2, 2)).toEqual([]);
    expect(array.slice(2, 20)).toEqual(["and", "jelly"]);
    expect(array.slice(3, 0)).toEqual([]);
    expect(array.slice(3, 100)).toEqual(["jelly"]);
    expect(array.slice(5, 1)).toEqual([]);
  });

  it("should know array references", function () {
    var array = ["zero", "one", "two", "three", "four", "five"];

    function passedByReference(refArray) {
      refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe("changed in function");

    var assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe("changed in assignedArray");

    var copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe("three");
  });

  /* array.push() 메서드: ----------
  (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
  1. 형태: array.push()
  -해당 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환한다. 
  -push() 메서드 결과, 기존 배열은 추가된 요소를 포함해서 반환한다.
  (=push() 메서드는 원래의 배열에 영행을 준다.)
  2-1. 예시
  let sampleArr = ['가', '나', '다', '라'];
  let plus = sampleArr.push('마');
  console.log(plus); // 5
  console.log(sampleArr); // ["가", "나", "다", "라", "마"]
  2-2. 예시
  let sampleArr2 = ['바람', '태양', '강아지', '고양이'];
  let plus2 = sampleArr2.push('사슴', '필통');
  console.log(plus2); // 6
  console.log(sampleArr2); // ["바람", "태양", "강아지", "고양이", "사슴", "필통"] */

  /* array.pop() 메서드: ----------
  (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
  1. 형태: array.pop()
  -해당 배열의 '마지막' 요소를 제거하고, '제거된 요소'를 반환한다.
  -pop() 메서드 결과, 기존 배열은 제거된 요소를 뺴고 반환한다(제거된 요소는 더 이상 기존 배열에 없다).
  (=pop() 메서드는 원래의 배열에 영행을 준다.)
  -pop()의, ()안에 요소를 넣을 필요 없다.
  2. 예시
  let sampleArr = ['가', '나', '다', '라'];
  let popped = sampleArr.pop();
  console.log(popped); // '라'
  console.log(sampleArr); // ['가', '나', '다'] */
  it("should push and pop", function () {
    var array = [1, 2];
    array.push(3);

    expect(array).toEqual([1, 2, 3]);

    var poppedValue = array.pop();
    expect(poppedValue).toBe(3);
    expect(array).toEqual([1, 2]);
  });

  /* array.unshift() 메서드: ----------
  (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
  1. 형태: array.unshift()
  -해당 배열의 맨 앞에 새로운 요소를 추가하고, 배열의 새로운 길이를 반환한다. 
  -unshift() 메서드 결과, 기존 배열은 추가된 요소를 포함해서 반환한다.
  (=unshift() 메서드는 원래의 배열에 영행을 준다.)
  -unshift()의, ()안에 요소를 넣을 필요 없다.
  2-1. 예시
  let sampleArr = ['나', '다', '라', '마'];
  let plus = sampleArr.unshift('가');
  console.log(plus); // 5
  console.log(sampleArr); // ["가", "나", "다", "라", "마"]
  2-2. 예시
  const array1 = [1, 2, 3];
  console.log(array1.unshift(-1, 0)); // 5
  console.log(array1); // [-1, 0, 1, 2, 3] */

  /* array.shift() 메서드: ----------
  (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
  1. 형태: array.shift()
  -해당 배열의 첫 번째 요소를 제거하고, '제거된 요소'를 반환한다.
  -shift() 메서드 결과, 기존 배열은 제거된 요소를 뺴고 반환한다(제거된 요소는 더 이상 기존 배열에 없다).
  (=shift() 메서드는 원래의 배열에 영행을 준다.) 
  2. 예시
  let sampleArr = ['가', '나', '다', '라'];
  let shifted  = sampleArr.shift();
  console.log(shifted); // '가'
  console.log(sampleArr); // ['나', '다', '라'] */
  it("should know about shifting arrays", function () {
    var array = [1, 2];

    array.unshift(3);
    expect(array).toEqual([3, 1, 2]);

    var shiftedValue = array.shift();
    expect(shiftedValue).toEqual(3);
    expect(array).toEqual([1, 2]);
  });
});
