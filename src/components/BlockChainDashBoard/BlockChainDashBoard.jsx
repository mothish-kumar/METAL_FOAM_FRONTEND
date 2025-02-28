import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "../../components/ui/card";


const BlockChainDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/get-transaction-history") 
      .then(response => setTransactions(response.data))
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  const transactionCounts = transactions.reduce((acc, tx) => {
    const date = new Date(tx.timestamp * 1000).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Process data for charts
  const transactionsOverTime = Object.keys(transactionCounts).map(date => ({
    date,
    count: transactionCounts[date]
  }));

  const transactionTypeDistribution = transactions.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(transactionTypeDistribution).map(type => ({
    name: type,
    value: transactionTypeDistribution[type]
  }));

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Transactions Table */}
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Transaction History</h2>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100 border-b">
                <tr>
                <th className="px-4 py-2 border text-left min-w-[50px]">Sno</th>
                    <th className="px-4 py-2 border text-left min-w-[200px]">Transaction Hash</th>
                    <th className="px-4 py-2 border text-left min-w-[150px]">From</th>
                    <th className="px-4 py-2 border text-left min-w-[150px]">To</th>
                    <th className="px-4 py-2 border text-left min-w-[120px]">Gas Used</th>
                    <th className="px-4 py-2 border text-left min-w-[120px]">Time Stamp</th>

                </tr>
                </thead>
                <tbody>
                {transactions.map((tx,index) => (
                    <tr key={tx.hash} className="border-b">
                    <td className="px-4 py-2 border">{index + 1}</td> 
                    <td className="px-4 py-2 border whitespace-nowrap">{tx.hash}</td>
                    <td className="px-4 py-2 border">{tx.from}</td>
                    <td className="px-4 py-2 border">{tx.to}</td>
                    <td className="px-4 py-2 border">{tx.gasUsed}</td>
                    <td className="px-4 py-2 border">{new Date(tx.timestamp * 1000).toLocaleDateString()}</td>

                    </tr>
                ))}
                </tbody>
            </table>
</div>


        </CardContent>
      </Card>

      {/* Line Chart - Transactions Over Time */}
      <Card>
  <CardContent>
    <h2 className="text-xl font-bold mb-2">Transactions Over Time</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={transactionsOverTime}>
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `${value} tx`} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

      {/* Pie Chart - Transaction Type Distribution */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Transaction Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockChainDashboard;
