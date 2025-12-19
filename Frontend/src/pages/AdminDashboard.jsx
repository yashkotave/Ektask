import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const statusOptions = ["Pending", "Reviewed", "Selected", "Rejected"];

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxTgu1gIDPNjq4BTA6MreSUTOFsSx_PnTfzdeBElsJZjxKoOp8Pg8Fixc545xfnXr4/exec";

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setFiltered(d);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load data!");
        setLoading(false);
      });
  }, []);

  /* ---------------- SEARCH + ROLE FILTER ---------------- */
  useEffect(() => {
    const searchText = search.toLowerCase();

    const result = data.filter((row) => {
      const matchesSearch =
        !searchText ||
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchText);

      const matchesRole =
        !roleFilter || row["Role"] === roleFilter;

      return matchesSearch && matchesRole;
    });

    setFiltered(result);
  }, [search, roleFilter, data]);

  /* ---------------- EXPORT TO EXCEL ---------------- */
  const handleExport = () => {
    if (filtered.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "ektask_applications.xlsx");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="pt-20 px-5 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Dashboard — Applications
      </h1>

      {/* SEARCH */}
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone, role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl shadow-sm"
        />
      </div>

      {/* ROLE FILTER */}
      <div className="max-w-md mx-auto mb-4">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl shadow-sm"
        >
          <option value="">All Roles</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Graphic Designer</option>
          <option>Video Editor</option>
          <option>Digital Marketer</option>
          <option>Customer Support</option>
          <option>Sales Executive</option>
        </select>
      </div>

      {/* EXPORT */}
      <div className="text-center mb-6">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
        >
          Export to Excel
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        <div className="overflow-auto border rounded-xl shadow-lg">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                {Object.keys(filtered[0] || {}).map((key) => (
                  <th key={key} className="p-3 border">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className="odd:bg-gray-100 even:bg-white">
                  {Object.entries(row).map(([key, val], j) => (
                    <td key={j} className="p-3 border">
                      {key === "Status" ? (
                        <select
                          value={val}
                          className="border rounded px-2 py-1"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        String(val)
                      )}
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
