function getDateInSecs(date) {
    return (+new Date(date))/1000
  }
  
  function normalizeDate(date) {
    return isNumber(date)? date : getDateInSecs(date)
  }
  
  function isNumber(num) {
    return !isNaN(Number(num))
  }
  
  function isNonNullObject(input) {
    return !!input &&
           typeof input === "object" &&
           !Array.isArray(input);
  }
  
  function normalizeBoolean(bool) {
    if (bool === undefined) {
      return bool
    }
  
    return bool ? 1 : 0
  }
  
  function isDefined (value) {
  
    return typeof value !== "undefined";
  }

 export {
    normalizeDate,
    normalizeBoolean,
    isNumber,
    getDateInSecs,
    isDefined,
    isNonNullObject,
  }
  