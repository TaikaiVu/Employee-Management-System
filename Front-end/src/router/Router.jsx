import {Route, Routes} from "react-router-dom"
import SignIn from "../pages/login/Login"
import HomePage from "../pages/home/HomePage"
import SignUp from "../pages/signup/SignUp"
import List from "../pages/crud"
import View from "../pages/crud/View"
import Add from "../pages/crud/Add"
import Edit from "../pages/crud/Edit"

const MainRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/view" element={<List/>}/>

            <Route path="/detail/:id" element={<View />} />
            <Route path="/create/" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />




        </Routes>
    )
}

export default MainRouter