import React, {createContext, useContext, useState} from "react"

const SoundContext = createContext()

export const SoundProvider=({children})=>{
	const[soundOn,setSoundOn]=useState(true)

	const playClick=()=>{
		if(soundOn){
			const audio=new Audio("/click.mp3") // place click.mp3 in public/
			audio.play()
		}
	}

	return(
		<SoundContext.Provider value={{soundOn,setSoundOn,playClick}}>
			{children}
		</SoundContext.Provider>
	)
}

export const useSound=()=>useContext(SoundContext)
