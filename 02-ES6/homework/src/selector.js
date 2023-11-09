var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  // TU CÓDIGO AQUÍ
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl)) resultSet.push(startEl);
  for (const child of startEl.children) {
    resultSet.push(...traverseDomAndCollectElements(matchFunc, child));
  }
  return resultSet;
};
// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  for (let i = 1; i < selector.length; i++) {
    if (selector[i] === ".") return "tag.class";
  }
  return "tag";
};
// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.
var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector;
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      for (let i = 0; i < element.classList.length; i++) {
        if (`.${element.classList[i]}` === selector) return true;
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      let [tag, clase] = selector.split(".");
      let funcClass = matchFunctionMaker(`.${clase}`);
      let funcTag = matchFunctionMaker(tag);
      return funcClass(element) && funcTag(element);
    };
  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName === selector.toUpperCase();
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
