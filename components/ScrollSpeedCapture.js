import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';

const ScrollSpeedCapture = ({ onScroll, children }) => {
  const scrollViewRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;
    const distance = Math.abs(scrollY - lastScrollY);
    const speed = distance / timeDiff; // Speed in pixels per millisecond

    // Determine direction
    const direction = scrollY > lastScrollY ? 'down' : 'up';

    // Call onScroll callback with speed and direction
    if (onScroll && typeof onScroll === 'function') {
      onScroll({ speed, direction });
      console.log({ speed:`${speed} pixels/ms`, direction })
    }

    // Update last scroll time and position
    setLastScrollTime(currentTime);
    setLastScrollY(scrollY);
  };

  return (
    <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
      {children}
    </ScrollView>
  );
};

export default ScrollSpeedCapture;
