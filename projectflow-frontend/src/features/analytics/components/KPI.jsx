const KPI = ({ title, value }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all">
    
    <p className="text-sm text-gray-500 dark:text-slate-400">
      {title}
    </p>

    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
      {value}
    </h3>

  </div>
);

export default KPI;