import AcademicLoadList from "../../components/academic_load/AcademicLoadList"
import AcademicLoadCreate from "../../components/academic_load/AcademicLoadCreate"
import SideMenu from "../../components/sidemenu/sideMenu"
import TableTeachers from "../../components/academic_load/ListingTableByTeachers";
import TablePqr from "../../components/contact_me/pqr";
import { useEffect, useState } from "react";

function AcademicLoad() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isTeachers, setIsTeachers] = useState(false);
    useEffect(() => {
      if (typeof window !== "undefined" && window.localStorage) {
        const user = JSON.parse(localStorage?.getItem("user"));
        if (user?.role == "admin") setIsAdmin(true);
        if (user?.role == "student") setIsStudent(true);
        if (user?.role == "teacher") setIsTeachers(true);
      }
    }, [isAdmin, isStudent, isTeachers]); 

    return (
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="sm:px-10 lg:py-8">  
                        {
                            isTeachers && (
                                <>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
        
                                        <div className="">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est eveniet asperiores numquam repellendus? Iure in consequuntur minus, enim cumque ducimus vero, distinctio voluptatibus ipsum numquam quam possimus assumenda maxime ex quaerat dolor illo quasi, ab eos? Debitis magni blanditiis sapiente fugiat tempora accusantium temporibus dolorem exercitationem enim iusto asperiores commodi doloremque repudiandae, ea similique aliquam cum quam perspiciatis animi? Consectetur!
                                            
                                        </div>

                                        <div className="">
                                            <AcademicLoadList />
                                        </div>

                                        <div>
                                            <AcademicLoadCreate />
                                        </div>

                                    </div>
                                </>
                            )
                        }
                        {
                            isStudent && (
                                <>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                                
                                        <div className="col-span-2">
                                            <TableTeachers />
                                            
                                        </div>

                                    </div>
                                </>
                            )
                        }
                        {
                            isAdmin && (
                                <>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                                
                                        <div className="col-span-2">
                                            <TablePqr />
                                            
                                        </div>

                                    </div>
                                </>
                            )
                        }
                    </div>
            </div>
        </div>
    )
}

export default AcademicLoad