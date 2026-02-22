import React from 'react'
import RoutesFile from './RoutesFile'
import { UserContextProvider } from "./UserContext";
const App = () => {  
  
  return (
    <>
    <UserContextProvider>
   <RoutesFile/>
   </UserContextProvider>
   </>

  )
}

export default App
