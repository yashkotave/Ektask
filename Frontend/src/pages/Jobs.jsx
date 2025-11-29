import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Jobs() {
  // REDUX SE DATA
  const jobList = useSelector((state) => state.jobs.jobList);

  return (
    <div className="pt-20 px-5">

      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Explore{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Job Openings
          </span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Apply for the latest job roles available at Ektask.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {jobList.map((job, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
              {job.type}
            </span>

            <h3 className="text-2xl font-semibold mt-4">{job.title}</h3>
            <p className="text-gray-500">{job.company}</p>

            <p className="text-gray-600 mt-4">{job.desc}</p>

            <p className="mt-5"><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Location:</strong> {job.location}</p>

            <Link to="/apply">
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Apply Now
              </button>
            </Link>
          </div>
        ))}
      </section>

    </div>
  );
}
