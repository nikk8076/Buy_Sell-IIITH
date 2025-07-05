import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

export const myContext = createContext({});

export function UserContextProvider({children})
{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/profile')
            .then((response) => {
                if (response.data) {
                    setUser({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        contactNumber: response.data.contactNumber,
                        cart: response.data.cart,
                    });
                    console.log("User data fetched:", response.data);
                } else {
                    setUser(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <myContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </myContext.Provider>
    )
}