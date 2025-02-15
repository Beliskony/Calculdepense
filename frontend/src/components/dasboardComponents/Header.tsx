
const Header = () => {
  return (
    <div className="flex flex-row w-full mt-5 justify-between">

        <div className="w-[50%] text-center">
            <h1 className="text-3xl font-bold text-black">Recapitulatif des depenses</h1>
        </div>

        <div className="flex flex-row gap-x-2 w-[50%] justify-center">
            <img src="https://i.pinimg.com/474x/fa/f7/43/faf74349a5fe94fadfb84d115bba1329.jpg" className="h-16 w-16 rounded-full object-cover"/>
            <div className="flex flex-col gap-y-1">
                <h1 className="text-xl font-medium text-black">nom et prenom</h1>
                <p className="text-xs font-light text-gray-600">Profession</p>
            </div>  
        </div>
      
    </div>
  )
}

export default Header
