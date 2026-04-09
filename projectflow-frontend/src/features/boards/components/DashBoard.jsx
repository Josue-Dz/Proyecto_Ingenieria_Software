

const DashBoard = () => {
    return (
        <div>
            <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-4">
                    {/*Proyectos activos  */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-sm font-semibold mb-2">Proyectos Activos</p>
                        <h4 className="text-2xl font-bold text-indigo-600">{5}</h4>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100/10">
                        <p className="text-slate-500 text-sm font-semibold mb-2">Tareas pendientes</p>
                        <h4 className="text-2xl font-bold text-indigo-600">{10}</h4>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100/10">
                        <p className="text-slate-500 text-sm font-semibold mb-2">Eficiencia</p>
                        <h4 className="text-2xl font-bold text-indigo-600">{85}%</h4>
                    </div>

                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default DashBoard