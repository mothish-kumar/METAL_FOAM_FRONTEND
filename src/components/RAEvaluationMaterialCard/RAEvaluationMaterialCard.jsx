import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";

const RAEvaluateMaterialCard = ({ evaluationData, optimalForce, updateOptimalForce, closeModal }) => {
  const [force, setForce] = useState(optimalForce?.force || "");
  const [stress, setStress] = useState(optimalForce?.stress || "");
  const [strain, setStrain] = useState(optimalForce?.strain || "");
  const [youngsModulus, setYoungsModulus] = useState(optimalForce?.youngsModulus || "");

  const isOptimalForceValid =
    optimalForce &&
    typeof optimalForce.force === "number" &&
    typeof optimalForce.stress === "number" &&
    typeof optimalForce.strain === "number" &&
    typeof optimalForce.youngsModulus === "number";

  const handleSaveChanges = () => {
    updateOptimalForce({ force, stress, strain, youngsModulus });
    closeModal();
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AiFillCheckCircle className="text-green-400" />
          Material Evaluation Analysis
        </h2>
      </div>

      {/* Optimal Force Section (Editable) */}
      <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold">Optimal Force</h3>
        {isOptimalForceValid ? (
          <>
            <label className="block text-gray-300">Force (N):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={force}
              onChange={(e) => setForce(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Stress (Pa):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={stress}
              onChange={(e) => setStress(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Strain:</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={strain}
              onChange={(e) => setStrain(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Young's Modulus (Pa):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white"
              value={youngsModulus}
              onChange={(e) => setYoungsModulus(parseFloat(e.target.value) || "")}
            />
          </>
        ) : (
          <>
          <p className="text-red-400 font-semibold">No suitable force found</p>
            <label className="block text-gray-300">Force (N):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={force}
              onChange={(e) => setForce(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Stress (Pa):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={stress}
              onChange={(e) => setStress(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Strain:</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white mb-2"
              value={strain}
              onChange={(e) => setStrain(parseFloat(e.target.value) || "")}
            />
            <label className="block text-gray-300">Young's Modulus (Pa):</label>
            <input
              type="number"
              className="w-full bg-gray-700 border border-gray-600 p-2 rounded-md text-white"
              value={youngsModulus}
              onChange={(e) => setYoungsModulus(parseFloat(e.target.value) || "")}
            />
          </>
        )}
      </div>

      {/* Read-only Evaluation Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Force (N)</th>
              <th className="p-2 border border-gray-700">Stress (Pa)</th>
              <th className="p-2 border border-gray-700">Strain</th>
              <th className="p-2 border border-gray-700">Young's Modulus (Pa)</th>
              <th className="p-2 border border-gray-700">Tensile Strength</th>
              <th className="p-2 border border-gray-700">Flexural Strength</th>
            </tr>
          </thead>
          <tbody>
            {evaluationData.map((item, index) => (
              <tr key={index} className="border border-gray-700">
                <td className="p-2">{item.force}</td>
                <td className="p-2">{item.stress}</td>
                <td className="p-2">{item.strain}</td>
                <td className="p-2">{item.youngsModulus}</td>
                <td className="p-2">
                  {item.isWithinTensileStrength ? (
                    <AiFillCheckCircle className="text-green-400" />
                  ) : (
                    <AiFillWarning className="text-red-400" />
                  )}
                </td>
                <td className="p-2">
                  {item.isWithinFlexuralStrength ? (
                    <AiFillCheckCircle className="text-green-400" />
                  ) : (
                    <AiFillWarning className="text-red-400" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Visualization */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Load Bearing Capacity</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={evaluationData}>
            <XAxis dataKey="force" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="loadBearingCapacity" fill="#facc15" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Save Button */}
      <button className="btn btn-primary mt-4 w-full" onClick={handleSaveChanges}>
        Save changes
      </button>
    </div>
  );
};

export default RAEvaluateMaterialCard;
