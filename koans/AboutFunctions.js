describe("About Functions", function () {
  it("should declare functions", function () {
    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";

    function parentfunction() {
      var variable = "local";

      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {
    function makeMysteryFunction(makerValue) {
      var newFunction = function doMysteriousThing(param) {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3);
    var mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {
    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe(
      "first",
      "second",
      "third"
    );

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    /* array.join() 메서드: ---------- 
    (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
    1. 형태: array.join(separator) 
    -배열의 모든 요소를 연결해 하나의 문자열로 반환한다.
    -separator: 배열의 각 요소를 구분할 문자열을 지정한다.
    separator를 생략하면 배열의 각 요소 사이는 쉼표(,)로 구분된다.
    separator에 빈 문자열을 넣을 경우, 배열의 각 요소 사이에는 아무 문자열 없이 붙어서 연결된다. 
    2. 예시
    const elements = ['Fire', 'Air', 'Water'];
    console.log(elements.join()); // Fire,Air,Water
    console.log(elements.join('')); // FireAirWater
    console.log(elements.join('-')); // Fire-Air-Water */
    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe(
      "first,second,third"
    );
  });

  /* { : } */
  it("should pass functions as values", function () {
    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");
  });
});
