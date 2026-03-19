
const AddButton = ({ textoBoton, setIsModalOpen, loading }) => {
  return (
    <div className="mb-4 flex justify-end">
        <button 
        disabled={loading}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#A3FF12]/15 border dark:border-[#A3FF12]/30 dark:text-[#A3FF12] text-base font-semibold dark:hover:bg-[#A3FF12]/25 transition-colors">
            <span className="material-symbols-rounded text-white text-[14px]">add</span>
            {textoBoton}
        </button>
    </div>
  )
}

export default AddButton