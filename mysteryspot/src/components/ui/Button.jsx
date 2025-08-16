export function Button({children,onClick,className=""}) {
	return (
		<button 
			onClick={onClick} 
			className={`px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition ${className}`}
		>
			{children}
		</button>
	)
}
