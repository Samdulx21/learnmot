import AcademicLoadList from "../../components/academic_load/AcademicLoadList"
import SideMenu from "../../components/sidemenu/sideMenu"

function AcademicLoad() {
    return (
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="sm:px-10 lg:py-8">  
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                            
                            <div className="">
                                <AcademicLoadList />
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AcademicLoad