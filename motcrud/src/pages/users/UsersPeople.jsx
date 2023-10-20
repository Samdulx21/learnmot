import SideMenu from "../../components/sidemenu/sideMenu"
import UsersCreate from "../../components/users_crud/UsersCreate"
import UsersList from "../../components/users_crud/UsersList"

function UsersPeople(){
    return(
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="sm:px-10 lg:py-8">  
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                            
                            <div className="">
                                <UsersCreate />
                            </div>
                            
                            <div className="">
                                <UsersList />
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default UsersPeople