import SideMenu from "../components/sidemenu/sideMenu"
import HeaderUsers from "../components/navbar/HeaderUsers"

function UsersHome(){
    return (
        <>
            <div className="flex">
                 <SideMenu /> 
                    <div className="flex mx-48 max-w-screen-2xl">
                        <HeaderUsers />
                    </div>             
            </div>
        </>
    )
}

export default UsersHome