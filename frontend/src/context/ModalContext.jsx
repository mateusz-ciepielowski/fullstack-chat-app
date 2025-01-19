import { createContext, useState } from "react";

const ModalContext = createContext({
  isClosed: null,
  setIsClosed: () => {},
});

// eslint-disable-next-line react/prop-types
export function ModalContextProvider({ children }) {
  const [isClosed, setIsClosed] = useState(null);
  return (
    <ModalContext.Provider value={{ isClosed, setIsClosed }}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
