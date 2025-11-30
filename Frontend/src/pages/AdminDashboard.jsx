import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const applications = useSelector(
    (state) => state.applications.applications
  );

  return (
    <div className="pt-20 px-5 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        View all job applications submitted from the Apply Job form.
      </p>

      {applications.length === 0 ? (
        <p className="text-gray-500">
          No applications received yet. Ask someone to submit the form first 🙂
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">#</th>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Phone</th>
                <th className="border px-3 py-2 text-left">Role</th>
                <th className="border px-3 py-2 text-left">Experience</th>
                <th className="border px-3 py-2 text-left">Resume Link</th>
                <th className="border px-3 py-2 text-left">File</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{app.fullname}</td>
                  <td className="border px-3 py-2">{app.email}</td>
                  <td className="border px-3 py-2">{app.phone}</td>
                  <td className="border px-3 py-2">{app.role}</td>
                  <td className="border px-3 py-2">
                    {app.experience || "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Open
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {app.fileName || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
