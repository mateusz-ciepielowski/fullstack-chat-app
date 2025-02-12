import { createContext, useState } from "react";

const ModalContext = createContext({
  isClosed: null,
  setIsClosed: () => {},
  isEditing: null,
  setIsEditing: () => {},
  isAttendanceClosed: null,
  setIsAttendanceClosed: () => {},
});

// eslint-disable-next-line react/prop-types
export function ModalContextProvider({ children }) {
  const [isClosed, setIsClosed] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [isAttendanceClosed, setIsAttendanceClosed] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        isClosed,
        setIsClosed,
        isEditing,
        setIsEditing,
        isAttendanceClosed,
        setIsAttendanceClosed,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
