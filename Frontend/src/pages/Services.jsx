import { useSelector } from "react-redux";

export default function Services() {

  const services = useSelector((state) => state.services.services);

  return (
    <div className="pt-20 px-5">

      <section className="text-center mt-5">
        <h1 className="text-4xl md:text-5xl font-bold">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Services
          </span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We offer top-tier services that help individuals and businesses grow.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <div className="text-5xl">{service.icon}</div>
            <h3 className="text-2xl font-semibold mt-5">{service.title}</h3>
            <p className="text-gray-600 mt-3">{service.desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
