import React, { createContext } from "react";

export const UserContext = createContext(null)

const UserContextProvider = (props) =>{
    

    const contextValue = {
        
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;

