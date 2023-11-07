var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunctionMaker(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.childElementCount; i++) {
    let aux = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...aux];
  }
  return resultSet;
};
// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.split(".").length > 1) return "tag.class";
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
  } else if (selectorType === "class") {
  } else if (selectorType === "tag.class") {
  } else if (selectorType === "tag") {
  }
  return matchFunction;
};
var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
