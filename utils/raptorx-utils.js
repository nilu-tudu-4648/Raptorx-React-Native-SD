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
  function bytesToMB(bytes, decimals = 2) {
  if (bytes === 0) return "0 MB";

  const MB = 1024 * 1024; // Conversion factor (1 KiB = 1024 bytes)
  const mb = bytes / MB;

  return mb.toFixed(decimals) + " MB";
}

 export {
    normalizeDate,
    normalizeBoolean,
    isNumber,
    getDateInSecs,
    isDefined,
    isNonNullObject,
    bytesToMB
  }
  