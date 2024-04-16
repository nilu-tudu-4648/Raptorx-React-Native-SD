export const getElementInfo = (elementId, value, timeInSeconds = 60) => {
    const calculateWPM = (text, timeInSeconds) => {
      // Calculate the number of words in the text
      const words = text.trim().split(/\s+/);
      const wordCount = words.length;
    
      // Calculate WPM (Words Per Minute)
      const minutes = timeInSeconds / 60;
      const wpm = wordCount / minutes;
    
      // Round the result to the nearest integer
      return Math.round(wpm);
    };
  
    if (!value) {
      console.warn('Value is empty');
      return null;
    }
  
    const elementInfo = {
      element_id: elementId,
      element_value: value,
      is_pasted: false, // Placeholder value, update as needed
      wpm: calculateWPM(value, timeInSeconds),
    };
  
    return elementInfo;
};
