import React, { useState } from "react";

function Popup({ onClose, onSave, currentStatus }) {
  const [statuus, setStatus] = useState(currentStatus);

  const handleSave = () => {
    onSave(statuus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Update Ticket Status</h2>
        <select
          value={statuus}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 w-full rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
