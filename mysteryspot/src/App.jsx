import {useState} from "react"
import LoadingPage from "./pages/LoadingPage"
import MenuPage from "./pages/MenuPage"

export default function App(){
	const[loaded,setLoaded]=useState(false)
	return loaded?<MenuPage/>:<LoadingPage onFinish={()=>setLoaded(true)}/>
}
