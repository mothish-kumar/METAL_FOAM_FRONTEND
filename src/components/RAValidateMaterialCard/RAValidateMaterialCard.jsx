import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AiFillWarning } from "react-icons/ai";

const RAValidateMaterialCard = ({fromData,updateValidationData,closeModal}) => {
  // Initial State
  const [data, setData] = useState(fromData);

  // List of possible issues
  const issueOptions = [
    "Low Density",
    "High Thermal Conductivity",
    "High Thermal Expansion Risk",
    "Brittle Structure",
    "Corrosion Risk",
  ];

  // Handle Input Change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle Issue Selection
  const handleIssueToggle = (issue) => {
    setData((prev) => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter((i) => i !== issue)
        : [...prev.issues, issue],
    }));
  };
  const handleSaveChanges = () => {
    updateValidationData(data)
    closeModal()
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <AiFillWarning className="text-yellow-400" />
        Validation Material Analysis
      </h2>

      {/* Editable Fields */}
      <div className="mt-4">
        <label className="block text-sm text-gray-400">Mass (kg)</label>
        <input
          type="number"
          name="mass"
          value={data.mass}
          onChange={handleChange}
          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm text-gray-400">Quality</label>
        <select
          name="qualityString"
          value={data.qualityString}
          onChange={handleChange}
          className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        >
          <option value="High Quality">High Quality</option>
          <option value="Medium Quality">Medium Quality</option>
          <option value="Low Quality">Low Quality</option>
        </select>
      </div>

      {/* Issue Selection */}
      <div className="mt-4">
        <label className="block text-sm text-gray-400">Issues</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {issueOptions.map((issue) => (
            <label key={issue} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.issues.includes(issue)}
                onChange={() => handleIssueToggle(issue)}
                className="accent-yellow-400"
              />
              {issue}
            </label>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Mass Visualization</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[{ name: "Mass", value: data.mass }]}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="value" fill="#facc15" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button className="btn btn-primary mt-4 w-full" onClick={handleSaveChanges}>
        Save changes
      </button>
    </div>
  );
};

export default RAValidateMaterialCard;
