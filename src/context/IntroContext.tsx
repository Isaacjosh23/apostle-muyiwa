"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface IntroContextValue {
  entered: boolean;
  setEntered: (value: boolean) => void;
}

const IntroContext = createContext<IntroContextValue | undefined>(undefined);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  return (
    <IntroContext.Provider value={{ entered, setEntered }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used within an IntroProvider");
  }
  return context;
}
