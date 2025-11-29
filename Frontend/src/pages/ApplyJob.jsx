import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitApplication } from "../redux/jobApplicationSlice";

export default function ApplyJob() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    resume: "",
    fileName: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullname || !form.email || !form.phone || !form.role) {
      alert("Please fill all required fields");
      return;
    }

    // ------- SEND DATA TO GOOGLE SHEET -------
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbz-K0Y1PiGilWmheb4CQl6GKWN0l9qWYHXsCDlks0e6VdyIJ-X8zjQFGH3x4fC7amU/exec",
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      alert("Your Job Application Has Been Submitted!");

    } catch (err) {
      alert("Something went wrong! Try again.");
    }

    // ------- STORE IN REDUX -------
    dispatch(submitApplication(form));

    setForm({
      fullname: "",
      email: "",
      phone: "",
      role: "",
      experience: "",
      resume: "",
      fileName: "",
    });
  };

  return (
    <div className="pt-20 px-5 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center">
        Apply for Your Dream Job
      </h1>
      <p className="text-gray-600 text-center mt-2 mb-10">
        Fill your details and we will contact you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-xl">

        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="9876543210"
          />
        </div>

        {/* Job Role */}
        <div>
          <label className="block font-semibold mb-2">
            Select Job Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          >
            <option value="">Select job role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Video Editor">Video Editor</option>
            <option value="Digital Marketer">Digital Marketer</option>
            <option value="HR Executive">HR Executive</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Sales Executive">Sales Executive</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block font-semibold mb-2">
            Experience (Optional)
          </label>
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
            placeholder="Fresher / 1 Year / 2 Years ..."
          />
        </div>

        {/* Resume Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Resume Link Optional */}
          <div>
            <label className="block font-semibold mb-2">Resume Link (Optional)</label>

            <input
              type="text"
              name="resume"
              value={form.resume}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Paste Google Drive link (optional)"
            />
          </div>

          {/* Upload Resume */}
          <div>
            <label className="block font-semibold mb-2">Upload Resume (PDF)</label>

            <div className="flex items-center gap-3">

              {/* Hidden Input */}
              <input
                id="resumeUpload"
                type="file"
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

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => document.getElementById("resumeUpload").click()}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition w-full"
              >
                {form.fileName ? "Change File" : "Upload Resume"}
              </button>
            </div>

            {/* File Preview */}
            {form.fileName && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 py-2 px-3 rounded-lg">
                <p className="text-sm text-gray-700">{form.fileName}</p>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, fileName: "" })}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
