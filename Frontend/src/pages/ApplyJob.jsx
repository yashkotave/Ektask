import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitApplication } from "../redux/jobApplicationSlice";

/**
 * ApplyJob Component
 * Handles job application form submission with validation and file upload
 */

// API Configuration
const API_URL =
  "https://script.google.com/macros/s/AKfycbx-lcEonWYmUwcFqnNPJNGPi7KC8_Y5pUGXI8cLeuisEunifE0t-ZAdy7QxP4IUfW8/exec";

// Available job positions
const JOB_ROLES = [
  "Exam Lab Invigilator",
  "System Operator",
  "Field Sales Executive",
  "Tele Caller",
  "HR executive",
  "Customer Support Executive",
  "Telesales Executive",
];

// Form field configuration
const FORM_FIELDS = {
  fullname: { label: "Full Name", placeholder: "Enter your full name" },
  email: { label: "Email Address", placeholder: "example@gmail.com" },
  phone: { label: "Phone Number", placeholder: "10-digit number" },
  country: { label: "Country", placeholder: "Enter your country" },
  stateName: { label: "State/Province", placeholder: "Enter your state" },
  district: { label: "District", placeholder: "Enter your district" },
  city: { label: "City", placeholder: "Enter your city" },
  address: { label: "Complete Address", placeholder: "Enter your full address" },
  role: { label: "Job Role", placeholder: "Select a job role" },
  experience: { label: "Years of Experience", placeholder: "e.g., Fresher / 1 year / 2 years" },
};

export default function ApplyJob() {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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

  /**
   * Validates a single form field based on its type and value
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @returns {string} Error message if validation fails, empty string if valid
   */
  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        return value.trim() ? "" : "Full name is required";
      case "email":
        if (!value.trim()) return "Email address is required";
        return /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email address";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        return /^\d{10}$/.test(value)
          ? ""
          : "Phone number must be exactly 10 digits";
      case "country":
        return value.trim() ? "" : "Country is required";
      case "stateName":
        return value.trim() ? "" : "State/Province is required";
      case "district":
        return value.trim() ? "" : "District is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "address":
        return value.trim().length < 5 ? "Please enter a valid address" : "";
      case "role":
        return value.trim() ? "" : "Job role selection is required";
      default:
        return "";
    }
  };

  /**
   * Handles form field changes with real-time validation
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-format phone input to 10 digits only
    let val = value;
    if (name === "phone") val = val.replace(/\D/g, "").slice(0, 10);

    setForm({ ...form, [name]: val });

    // Validate on change if field has been touched
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, val) });
    }
  };

  /**
   * Handles field blur event to trigger validation
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  /**
   * Validates all form fields and returns validation result
   * @returns {boolean} True if all fields are valid
   */
  const validateAll = () => {
    let newErr = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErr[key] = err;
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  /**
   * Handles form submission with validation and API call
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateAll()) return;

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }

    // Reset form after successful submission
    dispatch(submitApplication(form));
    setShowPopup(true);
    
    // Auto-hide success popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);

    // Reset form state
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

  /**
   * Renders a form input field with error handling
   */
  const renderFormField = (fieldName, type = "text", isTextarea = false) => {
    const config = FORM_FIELDS[fieldName];
    const hasError = !!errors[fieldName];

    const baseProps = {
      name: fieldName,
      value: form[fieldName],
      onChange: handleChange,
      onBlur: handleBlur,
      placeholder: config.placeholder,
      className: `w-full px-4 py-3 border rounded-lg transition-colors ${
        hasError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
      } focus:outline-none focus:ring-2`,
      "aria-label": config.label,
      "aria-invalid": hasError,
    };

    return (
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          {config.label} <span className="text-red-500">*</span>
        </label>
        {isTextarea ? (
          <textarea
            {...baseProps}
            rows={4}
            className={baseProps.className + " resize-none"}
          />
        ) : (
          <input {...baseProps} type={type} />
        )}
        {hasError && (
          <p className="text-red-500 text-sm mt-2" role="alert">
            {errors[fieldName]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="pt-20 px-5 max-w-3xl mx-auto pb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Apply for a Position</h1>
        <p className="text-gray-600 text-lg">
          Join our team by submitting your application below. We review all applications carefully.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-2xl border border-gray-200"
        noValidate
      >
        {/* PERSONAL INFORMATION SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          {renderFormField("fullname")}
          {renderFormField("email", "email")}
          {renderFormField("phone", "tel")}
        </div>

        {/* LOCATION INFORMATION SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Location Details</h2>
          {renderFormField("country")}
          {renderFormField("stateName")}
          {renderFormField("district")}
          {renderFormField("city")}
          {renderFormField("address", "text", true)}
        </div>

        {/* JOB INFORMATION SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Information</h2>
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Job Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                errors.role ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              } focus:outline-none focus:ring-2`}
              aria-label="Job Role"
              aria-invalid={!!errors.role}
            >
              <option value="">Select a job role</option>
              {JOB_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {errors.role}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Years of Experience <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g., Fresher / 1 year / 2 years"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              aria-label="Years of Experience"
            />
          </div>
        </div>

        {/* RESUME UPLOAD SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume Upload</h2>
          <div>
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
              aria-label="Upload Resume PDF"
            />

            <button
              type="button"
              onClick={() => document.getElementById("resumeUpload").click()}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              {form.fileName ? "Change Resume" : "Upload Resume (PDF)"}
            </button>

            {form.fileName && (
              <div className="mt-4 bg-gray-50 py-3 px-4 rounded-lg flex items-center justify-between border border-gray-200">
                <span className="text-gray-700 font-medium">{form.fileName}</span>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, fileName: "" })}
                  className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                  aria-label="Remove resume"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-lg text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:opacity-95"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Submitting...
            </span>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center animate-pulse max-w-sm w-full">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-10 h-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Application Submitted Successfully!
            </h2>

            <p className="text-gray-600 text-base">
              Thank you for your application. Our team will review it and contact you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
