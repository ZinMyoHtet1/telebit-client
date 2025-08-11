import React from "react";

const directoryContext = React.createContext();
const DirectoryProvider = directoryContext.Provider;

export { DirectoryProvider, directoryContext };
