import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

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

  const roles = Array.from(
    new Set(data.map((item) => item["Role"]).filter(Boolean))
  );

  return (
    <div className="pt-20 px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Dashboard – Applications
      </h1>

      {/* SEARCH */}
      {!loading && (
        <div className="max-w-md mx-auto mb-4">
          <input
            type="search"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="w-full px-4 py-2 border rounded-xl shadow-sm"
          />
        </div>
      )}

      {/* ROLE FILTER */}
      {!loading && (
        <div className="max-w-md mx-auto mb-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl shadow-sm"
          >
            <option value="">All Job Roles</option>
            {roles.map((role, i) => (
              <option key={i} value={role}>
                {role}
              </option>
            ))}
          </select>
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
                    className="p-3 border border-gray-300 text-left"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data
                .filter((row) => {
                  const searchText = search.toLowerCase();

                  const matchesSearch =
                    !searchText ||
                    Object.values(row)
                      .join(" ")
                      .toLowerCase()
                      .includes(searchText);

                  const matchesRole =
                    !roleFilter || row["Role"] === roleFilter;

                  return matchesSearch && matchesRole;
                })
                .map((row, i) => (
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
