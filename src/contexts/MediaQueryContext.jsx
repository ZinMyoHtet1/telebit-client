// UploadContext.jsx
import React, { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const mediaQueryContext = createContext();
const Provider = mediaQueryContext.Provider;

export function MediaQueryProvider({ children }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Provider value={{ windowWidth: size.width, windowHeight: size.height }}>
      {children}
    </Provider>
  );
}
