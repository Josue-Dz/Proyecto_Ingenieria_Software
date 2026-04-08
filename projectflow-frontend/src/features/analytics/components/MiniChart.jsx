import { Line, LineChart } from "recharts";

const MiniChart = ({ user }) => {
    console.log("Usuario 2: ", user)

  const data = [
    {name: "P", v: user.pendientes }, {name: "EP", v: user.enProgreso }, {name: "F", v: user.finalizadas }
  ];

  console.log("Data2: ", data)

  return (
    <LineChart width={80} height={40} data={data}>
      <Line type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={2} dot={false} />
    </LineChart>
  );
};

export default MiniChart;