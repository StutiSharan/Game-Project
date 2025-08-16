import {useEffect,useState} from "react"

export default function LoadingPage({onFinish}){
	const[progress,setProgress]=useState(0)

	useEffect(()=>{
		const interval=setInterval(()=>{
			setProgress(p=>{
				if(p>=100){
					clearInterval(interval)
					setTimeout(()=>onFinish(),500) // move to MenuPage
					return 100
				}
				return p+20
			})
		},300)
		return()=>clearInterval(interval)
	},[onFinish])

	return(
		<div className="w-screen h-screen flex items-center justify-center bg-black relative overflow-hidden">
			<img 
				src="/detective.jpg" 
				alt="Detective Background"
				className="absolute inset-0 w-full h-full object-cover blur-sm opacity-70"
			/>
			<div className="relative z-10 text-center">
				<h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6">🔎 Mystery Spot</h1>
				<div className="w-64 bg-gray-800 rounded-full h-4 mx-auto overflow-hidden">
					<div 
						className="h-full bg-yellow-400 transition-all duration-300" 
						style={{width:`${progress}%`}}
					></div>
				</div>
				<p className="mt-3 text-white">{progress}%</p>
			</div>
		</div>
	)
}
