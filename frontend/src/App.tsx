import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { SignUp } from "./pages/Signup"
import { SignIn } from "./pages/SignIn"
import { useState } from "react"

function App() {
  const [isLogin, setIsLogin]  = useState<boolean>(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp setIsLogin={setIsLogin} />} />
        <Route path="/signin" element={<SignIn setIsLogin={setIsLogin}/> } />
        <Route path="/dashboard" element={<Dashboard isLogin={false}/>} />
      </Routes>
    </BrowserRouter>
  )

  return <div></div>
}

export default App
