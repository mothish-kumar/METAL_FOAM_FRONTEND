import { useState } from "react";

const RAWeldingParams = ({ results,updateOptimalWeldingParameters,closeModal}) => {
  const [optimalParams, setOptimalParams] = useState(results.optimalWeldingParameters);
  const [power,setPower] = useState(results.optimalWeldingParameters.power)
  const [weldingSpeed,setWeldingSpeed] = useState(results.optimalWeldingParameters.weldingSpeed)
  const[heatInput,setHeatInput] = useState(results.optimalWeldingParameters.heatInput)
  const[coolingTime,setCoolingTime] = useState(results.optimalWeldingParameters.coolingTime)
  const [weldingStrength,setWeldingStrength] = useState(results.optimalWeldingParameters.weldingStrength)

  const handleSaveChanges = ()=>{
    updateOptimalWeldingParameters({power,weldingSpeed,heatInput,coolingTime,weldingStrength})
    closeModal()
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Welding Results</h2>
      <table className="mt-3 w-full border table ">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Power</th>
            <th className="border px-4 py-2">Welding Speed</th>
            <th className="border px-4 py-2">Heat Input</th>
            <th className="border px-4 py-2">Cooling Time</th>
            <th className="border px-4 py-2">Welding Strength</th>
          </tr>
        </thead>
        <tbody>
          {results.weldingResults.map((item, index) => (
            <tr key={index} className="border">
              <td className="border px-4 py-2">{item.power}</td>
              <td className="border px-4 py-2">{item.weldingSpeed}</td>
              <td className="border px-4 py-2">{item.heatInput}</td>
              <td className="border px-4 py-2">{item.coolingTime}</td>
              <td className="border px-4 py-2">{item.weldingStrength}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-bold mt-6">Optimal Welding Parameters</h3>
      <div className="p-4 border rounded bg-gray-100">
        <label className="block text-sm font-medium">Power:</label>
        <input
          type="number"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium mt-2">Welding Speed:</label>
        <input
          type="number"
          value={weldingSpeed}
          onChange={(e) =>setWeldingSpeed(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium mt-2">Heat Input:</label>
        <input
          type="number"
          value={heatInput}
          onChange={(e) =>setHeatInput(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium mt-2">Cooling Time:</label>
        <input
          type="number"
          value={coolingTime}
          onChange={(e) => setCoolingTime(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium mt-2">Welding Strength:</label>
        <input
          type="number"
          value={weldingStrength}
          onChange={(e) => setWeldingStrength(e.target.value)}
          className="w-full p-2 border rounded"
        />

      <button className="btn btn-primary mt-4 w-full" onClick={handleSaveChanges}>
        Save changes
      </button>
      </div>
    </div>
  );
};

export default RAWeldingParams;
