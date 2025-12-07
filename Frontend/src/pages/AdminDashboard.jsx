import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxTgu1gIDPNjq4BTA6MreSUTOFsSx_PnTfzdeBElsJZjxKoOp8Pg8Fixc545xfnXr4/exec";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load data!");
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Dashboard – Applications
      </h1>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key} className="p-3 border border-gray-300">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="odd:bg-gray-100 even:bg-white">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="p-3 border border-gray-300">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
