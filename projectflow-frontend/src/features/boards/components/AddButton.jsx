
const AddButton = ({ textoBoton, setIsModalOpen, loading }) => {
  return (
    <div className="flex justify-end w-full sm:w-auto">
        <button 
        disabled={loading}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 sm:px-4 py-3 h-10 rounded-xl bg-[#4b65d9] text-white hover:bg-[#4b65d9]/80 dark:bg-[#A3FF12]/15 border dark:border-[#A3FF12]/30 dark:text-[#A3FF12] text-sm sm:text-base dark:hover:bg-[#A3FF12]/25 transition-colors">
            <span className="material-symbols-rounded text-white text-[14px]">add</span>
            {textoBoton}
        </button>

    </div>
  )
}

export default AddButton