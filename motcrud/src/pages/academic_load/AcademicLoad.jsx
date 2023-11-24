import AcademicLoadList from "../../components/academic_load/AcademicLoadList"
import AcademicLoadCreate from "../../components/academic_load/AcademicLoadCreate"
import SideMenu from "../../components/sidemenu/sideMenu"

function AcademicLoad() {
    return (
        <div>
            <div className="flex">
                <SideMenu />
                    <div className="sm:px-10 lg:py-8">  
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
                    </div>
            </div>
        </div>
    )
}

export default AcademicLoad