const KPI = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-xl font-bold">{value}</h3>
  </div>
);

export default KPI;