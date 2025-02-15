import Corps from "../components/dasboardComponents/Corps"
import Header from "../components/dasboardComponents/Header"


function Dashboard() {
  return (
    <div className="h-full w-full flex flex-col px-10">
        <Header />
        <Corps />
      
    </div>
  )
}

export default Dashboard
