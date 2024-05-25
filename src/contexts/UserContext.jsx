/* eslint-disable react/prop-types */
import  { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a context provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};