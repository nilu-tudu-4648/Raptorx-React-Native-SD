class KeystrokeDynamicsSDK {
  constructor() {
      this.lastKeypressTime = 0;
      this.typingPattern = [];
      this.pauses = [];
      this.timer = null;
  }

  handleKeyPress(event) {
      const currentTime = Date.now();
      const key = event.nativeEvent.key || ' '; // Handle empty key press

      if (this.lastKeypressTime !== 0) {
          const interval = currentTime - this.lastKeypressTime;
          if (interval > 500) {
              this.pauses.push({
                  start: this.lastKeypressTime,
                  duration: interval,
              });
          }
      }

      this.typingPattern.push({ key, timestamp: currentTime });
      this.lastKeypressTime = currentTime;

      // Start timer if not running
      if (!this.timer) {
          this.timer = setTimeout(() => this.logMetrics(), 5000); // Log metrics every 5 seconds
      }
  }

  logMetrics() {
      const wpm = this.calculateWPM();
      const pauseDuration = this.calculatePauseDuration();

      // Clear typing pattern and pauses
      this.typingPattern = [];
      this.pauses = [];
      this.lastKeypressTime = 0;
      clearTimeout(this.timer);
      this.timer = null;

      console.log({ pauseDuration, wpm }); // Log the metrics
  }

  calculateWPM() {
      if (this.typingPattern.length <= 1) {
          return 0;
      }

      const typingStartTime = this.typingPattern[0].timestamp;
      const typingEndTime = this.lastKeypressTime;

      const minTypingTimeThreshold = 500;

      if (typingEndTime - typingStartTime < minTypingTimeThreshold) {
          return 0;
      }

      const numberOfCharacters = this.typingPattern.filter(event => /^[a-zA-Z0-9]$/.test(event.key)).length;
      const typingTimeInMinutes = (typingEndTime - typingStartTime) / (1000 * 60);
      const wordsPerMinute = Math.round(numberOfCharacters / 5 / typingTimeInMinutes); // Assuming an average word length of 5 characters

      return wordsPerMinute || 0;
  }

  calculatePauseDuration() {
      if (this.pauses.length === 0) {
          return 0;
      }

      const totalPauseDuration = this.pauses.reduce((acc, pause) => acc + pause.duration, 0);
      return totalPauseDuration;
  }
}

export default KeystrokeDynamicsSDK;
