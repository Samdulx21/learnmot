import SideMenu from "../../components/sidemenu/sideMenu"
import UsersList from "../../components/users_crud/UsersList"
import UsersCreate from "../../components/users_crud/UsersCreate"

function UsersPeople(){
    return(
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="md:px-10 lg:py-8 flex-grow">  
                        <div className="grid grid-cols-2 gap-2 lg:grid-cols-2 lg:gap-4">
                            
                            <div className="">
                                <UsersCreate />
                                
                            </div>
                            
                            <div className="">
                                <UsersList />
                            </div>

                            <div className="col-span-2" >
                            </div>
                            

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default UsersPeople