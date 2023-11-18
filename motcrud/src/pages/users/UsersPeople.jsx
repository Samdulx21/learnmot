import SideMenu from "../../components/sidemenu/sideMenu"
// import UsersCreate from "../../components/users_crud/UsersCreate"
import UsersList from "../../components/users_crud/UsersList"
import UseresEdit from "../../components/users_crud/UsersEdit"

function UsersPeople(){
    return(
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="md:px-10 lg:py-8">  
                        <div className="grid grid-cols-2 gap-2 lg:grid-cols-2 lg:gap-4">
                            
                            <div className="">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam eveniet consectetur beatae.
                            </div>
                            
                            <div className="">
                                <UsersList />
                            </div>

                            <div className="">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id optio voluptate ut, voluptas, excepturi iure ipsum assumenda deleniti tenetur laboriosam pariatur obcaecati incidunt exercitationem asperiores quia maiores, corporis placeat quisquam?
                            </div>
                            
                            <div className="col-span-2 ">
                                <UseresEdit />
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default UsersPeople