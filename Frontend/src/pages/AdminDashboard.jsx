import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxTgu1gIDPNjq4BTA6MreSUTOFsSx_PnTfzdeBElsJZjxKoOp8Pg8Fixc545xfnXr4/exec";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
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

      {/* ✅ SEARCH BAR (NO REFRESH ISSUE) */}
      {!loading && (
        <div className="max-w-md mx-auto mb-6">
          <input
            type="search"
            placeholder="Search by name, email, phone, role, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th
                    key={key}
                    className="p-3 border border-gray-300 text-left whitespace-nowrap"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data
                .filter((row) => {
                  if (!search.trim()) return true;

                  const text = search.toLowerCase();

                  return Object.values(row)
                    .join(" ")
                    .toLowerCase()
                    .includes(text);
                })
                .map((row, i) => (
                  <tr key={i} className="odd:bg-gray-100 even:bg-white">
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        className="p-3 border border-gray-300 whitespace-nowrap"
                      >
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
