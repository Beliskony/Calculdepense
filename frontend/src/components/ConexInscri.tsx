import { useState } from "react"
import Connexion from "./Connexion";
import Inscription from "./Inscription";

const ConexInscri=() => {
    const [entre, setEntre] = useState(1)

    const renduDuContenu = () =>{
        switch (entre) {
            case 1:
                 return <Connexion />                
            
            case 2:
                return <Inscription />
        
            default:
                return <Connexion />
        }
    }
  return (
    <section className="h-[700px] w-[450px] justify-between items-center flex flex-col border rounded-xl border-transparent my-10 shadow-[0px_4px_25px_-9px_rgba(0,_0,_0,_0.8)]">
        <div className=" flex flex-row justify-between items-end w-full h-32 bg-[#003C57] border-b rounded-b-2xl px-10">
            <button onClick={() => setEntre(1)} className={` mx-2 h-10 items-center ${entre===1 ? 'underline  text-white': 'none'}`}>
               <h2 className={`text-xl text-white font-light ${entre===1 ? 'underline':'none'}`}>
                Connexion
               </h2>
            </button>


            <button onClick={() => setEntre(2)} className={` mx-2 h-10 items-center ${entre===2 ? ' text-white': 'none'}`}>
               <h2 className={`text-xl text-white font-light ${entre===2 ? 'underline':'none'}`}>
                Incsription
               </h2>
            </button>
        </div>

        <div className="flex flex-col w-full justify-center">
            {renduDuContenu()}
        </div>

        <div className=" flex items-end w-full h-14 bg-[#003C57] border-t rounded-t-2xl"></div>

    </section>
  )
}

export default ConexInscri