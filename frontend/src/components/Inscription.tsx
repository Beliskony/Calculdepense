import { useState } from "react"
import { useNavigate} from "react-router-dom";
import axios from "axios"



const Inscription = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
    Nom:"",
    Email:"",
    Contact:"",
    MotDePasse:""
   })

   const changement = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const{ name, value } = e.target;
    setFormData((prev) => ({...prev, [name]:value}))
   }

   const soumettreFormulaire = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
        console.log("Inscription réussie", response.data);
        // Redirige l'utilisateur après l'inscription réussie
        navigate("/dashboard");
    } catch (error) {
        console.error("Erreur lors de l'inscription", error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur
    }
};



  return (
    <div className="flex flex-col w-full bg-white gap-y-8">
        <h2 className="text-2xl text-center font-medium">Créer un compte</h2>
    
    <form onSubmit={soumettreFormulaire} className="flex flex-col mx-10 gap-y-4">
        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=ywULFSPkh4kI&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Entrez votre nom"
                 name="Nom"
                 type="text"
                 value={formData.Nom}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=53435&format=png&color=003C57" className="mx-2"/>
          <input placeholder="mail"
                 name="Email"
                 type="email"
                 value={formData.Email}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none focus:ring-0"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=jShwZ2RCyPSO&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Contact"
                 name="Contact"
                 type="text"
                 value={formData.Contact}
                 onChange={changement}
                 required
                 className="w-full h-11 text-left outline-none focus:ring-0"/>
        </div>

        <div className="flex flex-row justify-center gap-x-3 rounded-2xl items-center border-[0.1px] border-transparent shadow-lg">
          <img src="https://img.icons8.com/?size=20&id=10480&format=png&color=003C57" className="mx-2"/>
          <input placeholder="Mot de passe"
                 name="MotDePasse"
                 type="password"
                 value={formData.MotDePasse}
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
