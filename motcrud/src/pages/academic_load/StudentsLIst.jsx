import SideMenu from "../../components/sidemenu/sideMenu"
import TableStudents from "../../components/academic_load/ListingTableByStudents"

function StudentList() {
    return (
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="sm:px-10 lg:py-8">  
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                            <div className="col-span-2">
                                <TableStudents />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default StudentList