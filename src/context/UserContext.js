import { createContext, useContext, useReducer, useEffect } from "react"
import { userReducer } from "../reducers/userReducer"

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(userReducer, {
    loading: false,
    error: "",
    user: null
  },
    (initialState) => {
      return {
        ...initialState,
        user: JSON.parse(localStorage.getItem("user-auth-token")) || null,
      }
    })
  const { loading, error, user } = state

  useEffect(() => {
    localStorage.setItem("user-auth-token", JSON.stringify(user))
  }, [user])

  return (
    <UserContext.Provider value={{ loading, error, user, userDispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('You should use useUser only within the UserContext.Provider')
  }
  return context
}