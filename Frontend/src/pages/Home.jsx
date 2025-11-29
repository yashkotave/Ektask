import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-20">

      {/* HERO SECTION */}
      <section className="mt-10 text-center px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Your Career with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Ektask
            </span>
          </h1>

          <p className="text-gray-600 mt-5 text-lg md:text-xl">
            India's most trusted platform for job applications, service hiring,
            and professional workforce solutions.
          </p>

          <Link to="/apply">
            <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-xl shadow-lg hover:shadow-xl transition scale-105 hover:scale-110">
              Apply for Jobs
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURE / SERVICES SECTION */}
      <section className="mt-24 px-5">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Top Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {/* CARD 1 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-transform hover:-translate-y-1 border border-gray-100">
            <div className="text-blue-600 text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold">Web Development</h3>
            <p className="text-gray-600 mt-2">
              Build fast, modern, responsive websites for your business.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-transform hover:-translate-y-1 border border-gray-100">
            <div className="text-purple-600 text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold">Digital Marketing</h3>
            <p className="text-gray-600 mt-2">
              Grow your brand with powerful digital marketing solutions.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-transform hover:-translate-y-1 border border-gray-100">
            <div className="text-green-600 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold">Graphic Designing</h3>
            <p className="text-gray-600 mt-2">
              High-quality visual content that makes your brand stand out.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="mt-24 px-5">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <p className="text-gray-700 italic">
              “I applied for a job and got hired within 48 hours. Great platform!”
            </p>
            <h4 className="text-blue-600 font-bold mt-4">— Rahul Verma</h4>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <p className="text-gray-700 italic">
              “Professional services, fast response, and excellent support.”
            </p>
            <h4 className="text-blue-600 font-bold mt-4">— Sneha Singh</h4>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mt-24 mb-16 text-center px-5">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-3 text-lg">
            Join Ektask today and boost your career instantly.
          </p>

          <Link to="/apply">
            <button className="mt-5 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-md">
              Apply Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
