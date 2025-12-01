import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { submitApplication } from "../redux/jobApplicationSlice";

export default function ApplyJob() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    resume: "",
    fileName: "",
  });

  // ⭐ STEP B — Read role from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlRole = params.get("role");

    if (urlRole) {
      setForm((prev) => ({ ...prev, role: urlRole }));
    }
  }, [location.search]);

  // VALIDATION FUNCTION
  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        if (!value.trim()) return "Full name is required";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+$/.test(value)) return "Enter a valid email";
        break;
      case "phone":
        if (!value.trim()) return "Phone number is required";

        if (countryCode === "+91") {
          if (!/^\d{10}$/.test(value))
            return "Indian phone number must be exactly 10 digits";
        } else {
          if (value.length < 5) return "Enter a valid phone number";
        }
        break;
      case "role":
        if (!value.trim()) return "Please select a job role";
        break;

      default:
        return "";
    }
    return "";
  };

  // ON CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = newValue.replace(/\D/g, "");
      newValue =
        countryCode === "+91"
          ? newValue.slice(0, 10)
          : newValue.slice(0, 15);
    }

    setForm({ ...form, [name]: newValue });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, newValue) });
    }
  };

  // ON BLUR
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // VALIDATE ALL BEFORE SUBMIT
  const validateAll = () => {
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      fullname: true,
      email: true,
      phone: true,
      role: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    const formToSend = {
      ...form,
      phone: countryCode + " " + form.phone,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxjMdfY9tDwHz8GsAZN1hrqpvIJNK2D9a8iUVIVy9DNic6UB8V4OFYQZctggpdNKd8/exec",
        {
          method: "POST",
          body: JSON.stringify(formToSend),
        }
      );
    } catch (error) {
      alert("Error submitting form!");
    }

    dispatch(submitApplication(formToSend));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    setForm({
      fullname: "",
      email: "",
      phone: "",
      role: "",
      experience: "",
      resume: "",
      fileName: "",
    });

    setTouched({});
    setErrors({});
  };

  return (
    <div className="pt-20 px-5 max-w-3xl mx-auto relative">
      <h1 className="text-4xl font-bold text-center">Apply for Your Dream Job</h1>
      <p className="text-gray-600 text-center mt-2 mb-10">
        Fill your details and we will contact you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-xl">

        {/* NAME */}
        <div>
          <label className="block font-semibold mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />

          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@gmail.com"
          />

          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* PHONE + COUNTRY CODE */}
        <div>
          <label className="block font-semibold mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-3">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setErrors({ ...errors, phone: "" });
              }}
              className="px-3 py-3 border rounded-xl bg-gray-100"
            >
              <option value="+91">🇮🇳 +91 (India)</option>
              <option value="+1">🇺🇸 +1 (USA)</option>
              <option value="+44">🇬🇧 +44 (UK)</option>
              <option value="+61">🇦🇺 +61 (Australia)</option>
              <option value="+971">🇦🇪 +971 (UAE)</option>
              <option value="+92">🇵🇰 +92 (Pakistan)</option>
              <option value="+81">🇯🇵 +81 (Japan)</option>
            </select>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={countryCode === "+91" ? "9876543210" : "Enter phone number"}
            />
          </div>

          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* ROLE (AUTO-FILLED VIA STEP B+C) */}
        <div>
          <label className="block font-semibold mb-2">
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
            <option value="">Select job role</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Graphic Designer</option>
            <option>Video Editor</option>
            <option>Digital Marketer</option>
            <option>HR Executive</option>
            <option>Customer Support</option>
            <option>Sales Executive</option>
            <option>Business Analyst</option>
          </select>

          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        {/* EXPERIENCE */}
        <div>
          <label className="block font-semibold mb-2">Experience (Optional)</label>

          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Fresher / 1 Year / 2 Years..."
          />
        </div>

        {/* RESUME + LINK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Resume Link (Optional)</label>

            <input
              type="text"
              name="resume"
              value={form.resume}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Paste Google Drive link"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Upload Resume (PDF)</label>

            <input
              id="resumeUpload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm({ ...form, fileName: file ? file.name : "" });
              }}
            />

            <button
              type="button"
              onClick={() => document.getElementById("resumeUpload").click()}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl w-full hover:bg-blue-700"
            >
              {form.fileName ? "Change File" : "Upload Resume"}
            </button>

            {form.fileName && (
              <div className="mt-2 flex justify-between bg-gray-100 py-2 px-3 rounded-lg">
                <p>{form.fileName}</p>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, fileName: "" })}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg"
        >
          Submit Application
        </button>
      </form>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-green-500 text-5xl mb-3">✔</div>
            <h2 className="text-2xl font-bold mb-1">Application Submitted!</h2>
            <p className="text-gray-600">We will contact you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
