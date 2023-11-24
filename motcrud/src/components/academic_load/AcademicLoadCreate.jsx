function AcademicLoadCreate() {

    return(
        <>
            <section className="bg-gray-100">
                <div className="">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form action="" className="space-y-4">                
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="name">Materia</label>
                                <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Materia"
                                type="text"
                                id="name"
                                name="name"
                                required
                                />
                            </div>
                            <div>
                                <textarea
                                id="description"
                                className="mt-2 w-full rounded-lg border-gray-200 align-top p-3 shadow-sm sm:text-sm"
                                rows="4"
                                placeholder="Enter any additional description..."></textarea>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="since_date">Fecha de incio</label>
                                <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Fecha de incio"
                                type="text"
                                id="since_date"
                                name="since_date"
                                required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="until_date">Expira</label>
                                <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Expira"
                                type="text"
                                id="until_date"
                                name="until_date"
                                required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white sm:w-auto">
                                Send Enquiry
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AcademicLoadCreate