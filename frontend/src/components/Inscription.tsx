import { useState } from "react"


const Inscription = () => {
   const [formData, setFormData] = useState({
    nom:"",
    email:"",
    contact:"",
    motDePasse:""
   })

   const changement = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const{ name, value } = e.target;
    setFormData((prev) => ({...prev, [name]:value}))
   }

  return (
    <div className="flex flex-col w-full bg-white gap-y-8">
        <h2 className="text-2xl text-center font-medium">Créer un compte</h2>
    
    <form  className="flex flex-col mx-10 gap-y-4">
        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=ywULFSPkh4kI&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Entrez votre nom"
                 name="nom"
                 type="text"
                 value={formData.nom}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=53435&format=png&color=003C57" className="mx-2"/>
          <input placeholder="mail"
                 name="email"
                 type="email"
                 value={formData.email}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none focus:ring-0"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=jShwZ2RCyPSO&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Contact"
                 name="contact"
                 type="text"
                 value={formData.contact}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none focus:ring-0"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=10480&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Mot de passe"
                 name="motDePasse"
                 type="password"
                 value={formData.motDePasse}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none focus:ring-0"/>
        </div>

        <button className=" flex w-full justify-center text-center items-center p-2 text-2xl font-medium text-white bg-[#003C57] rounded-4xl">
          Inscription
        </button>

        <div className="flex flex-row items-center mx-5 gap-x-2">
            <hr className="w-full"/> <h3 className="text-xs font-medium text-nowrap">Ou avec</h3> <hr className="w-full"/>
        </div>

        <div className="flex flex-row justify-between mx-5 ">
          <div className="flex flex-row gap-x-1 px-5 py-1 bg-white rounded-3xl border border-transparent shadow-[3px_1px_35px_19px_rgba(0,_0,_0,_0.1)]">
            <img src="https://img.icons8.com/?size=30&id=17949&format=png&color=000000"/>
            <h2>Google</h2>
          </div>

          <div className="flex flex-row gap-x-1 px-5 py-1 bg-[#003C57] rounded-3xl border border-transparent shadow-[3px_1px_35px_19px_rgba(0,_0,_0,_0.1)]">
            <img src="https://img.icons8.com/?size=30&id=60440&format=png&color=FFFFFF"/>
            <h2 className="text-white">Facebook</h2>
          </div>

        </div>
    </form> 
    </div>
  )
}

export default Inscription
