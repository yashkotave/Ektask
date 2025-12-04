import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitApplication } from "../redux/jobApplicationSlice";

export default function ApplyJob() {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const API_URL =
    "https://script.google.com/macros/s/AKfycbx-lcEonWYmUwcFqnNPJNGPi7KC8_Y5pUGXI8cLeuisEunifE0t-ZAdy7QxP4IUfW8/exec";

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    stateName: "",
    district: "",
    city: "",
    address: "",
    role: "",
    experience: "",
    resume: "",
    fileName: "",
  });

  /* VALIDATION */
  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        return value.trim() ? "" : "Full name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        return /\S+@\S+\.\S+/.test(value) ? "" : "Enter valid email";
      case "phone":
        if (!value.trim()) return "Phone is required";
        return /^\d{10}$/.test(value)
          ? ""
          : "Phone must be exactly 10 digits";
      case "country":
        return value.trim() ? "" : "Country is required";
      case "stateName":
        return value.trim() ? "" : "State is required";
      case "district":
        return value.trim() ? "" : "District is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "address":
        return value.trim() ? "" : "Address is required";
      case "role":
        return value.trim() ? "" : "Role is required";
      default:
        return "";
    }
  };

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    let val = value;
    if (name === "phone") val = val.replace(/\D/g, "").slice(0, 10);

    setForm({ ...form, [name]: val });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, val) });
    }
  };

  /* HANDLE BLUR */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  /* VALIDATE ALL */
  const validateAll = () => {
    let newErr = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErr[key] = err;
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);

    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(form),
      });
    } catch {
      alert("Error submitting form");
    }

    dispatch(submitApplication(form));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    setForm({
      fullname: "",
      email: "",
      phone: "",
      country: "",
      stateName: "",
      district: "",
      city: "",
      address: "",
      role: "",
      experience: "",
      resume: "",
      fileName: "",
    });

    setTouched({});
    setErrors({});
    setLoading(false);
  };

  return (
    <div className="pt-20 px-5 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Apply for a Job</h1>
      <p className="text-gray-600 text-center mt-2 mb-10">
        Fill the form carefully.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 shadow-lg rounded-xl"
      >
        {/* FULL NAME */}
        <div>
          <label className="font-semibold">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full name"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="font-semibold">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="10 digit number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* COUNTRY */}
        <div>
          <label className="font-semibold">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Country"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* STATE */}
        <div>
          <label className="font-semibold">
            State <span className="text-red-500">*</span>
          </label>
          <input
            name="stateName"
            value={form.stateName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="State"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.stateName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.stateName && (
            <p className="text-red-500 text-sm">{errors.stateName}</p>
          )}
        </div>

        {/* DISTRICT */}
        <div>
          <label className="font-semibold">
            District <span className="text-red-500">*</span>
          </label>
          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="District"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.district ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district}</p>
          )}
        </div>

        {/* CITY */}
        <div>
          <label className="font-semibold">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <label className="font-semibold">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={3}
            placeholder="Full address"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="font-semibold">
            Job Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Role</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Graphic Designer</option>
            <option>Video Editor</option>
            <option>Digital Marketer</option>
            <option>Customer Support</option>
            <option>Sales Executive</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role}</p>
          )}
        </div>

        {/* EXPERIENCE */}
        <div>
          <label className="font-semibold">Experience (Optional)</label>
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Fresher / 1 year / 2 years..."
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        {/* RESUME UPLOAD */}
        <div>
          <label className="font-semibold">Upload Resume (PDF)</label>

          <input
            type="file"
            id="resumeUpload"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({
                ...form,
                fileName: file ? file.name : "",
              });
            }}
          />

          <button
            type="button"
            onClick={() =>
              document.getElementById("resumeUpload").click()
            }
            className="px-4 py-3 bg-blue-600 text-white rounded-xl w-full"
          >
            {form.fileName ? "Change File" : "Upload Resume"}
          </button>

          {form.fileName && (
            <div className="mt-2 bg-gray-100 py-2 px-3 rounded-xl flex justify-between">
              <span>{form.fileName}</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, fileName: "" })}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-lg text-white ${
            loading
              ? "bg-gray-400"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center animate-popup">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="green"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-green-600 mt-4">
              Application Submitted!
            </h2>

            <p className="text-gray-600 mt-1 text-lg">
              Thank you! We will contact you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
