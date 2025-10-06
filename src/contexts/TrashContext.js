import React from "react";

const trashContext = React.createContext();
const TrashProvider = trashContext.Provider;

export { TrashProvider, trashContext };
