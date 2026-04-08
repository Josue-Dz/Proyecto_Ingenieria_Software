const ProgressBar = ({ value, color }) => {

  const colors = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-500",
    green: "bg-green-500"
  };

  return (
    <div className="p-1 items-center">
      <p className="text-sm">{value}</p>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded ${colors[color]}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;