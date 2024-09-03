import React, { createContext } from "react";

export const UserContext = React.createContext(null)

const UserContextProvider = (props) =>{
    

    const contextValue = {

    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.childern}
        </UserContext.Provider>
    )
}
export default UserContextProvider;

