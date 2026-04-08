const CircularProgress = ({ porcentaje }) => {
  return (
    <div className="p-1 w-10 h-10 rounded-full border-4 border-green-400 flex items-center justify-center text-xs">
      {porcentaje}%
    </div>
  );
};

export default CircularProgress;