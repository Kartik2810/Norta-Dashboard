import React, { useState } from "react";

function PopUP({ onClose, onSave, currentStatus }) {
  const [statuus, setStatuus] = useState(currentStatus);

  const handleSave = () => {
    onSave(statuus);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Change Ticket Status</h2>
        <select
          value={statuus}
          onChange={(e) => setStatuus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUP;
