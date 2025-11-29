import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobList: [
    {
      title: "Frontend Developer",
      company: "TechNova Pvt Ltd",
      salary: "₹25,000 - ₹40,000",
      location: "Remote",
      type: "Full-Time",
      desc: "Build responsive UI components using React, Tailwind, and APIs.",
    },
    {
      title: "Backend Developer",
      company: "Softworks",
      salary: "₹30,000 - ₹50,000",
      location: "Bangalore",
      type: "Full-Time",
      desc: "Work on Node.js, Express, MongoDB and authentication modules.",
    },
    {
      title: "Graphic Designer",
      company: "Pixel Studio",
      salary: "₹15,000 - ₹30,000",
      location: "Indore",
      type: "Part-Time",
      desc: "Create visually appealing graphics, posters, and branding materials.",
    },
    {
      title: "Video Editor",
      company: "MotionPro",
      salary: "₹20,000 - ₹35,000",
      location: "Mumbai",
      type: "Full-Time",
      desc: "Edit videos for ads, reels, YouTube and marketing campaigns.",
    },
    {
      title: "Digital Marketer",
      company: "BrandBoost",
      salary: "₹18,000 - ₹30,000",
      location: "Remote",
      type: "Full-Time",
      desc: "SEO, ads, campaign management and social media strategy.",
    },
    {
      title: "Data Analyst",
      company: "DataSight",
      salary: "₹35,000 - ₹60,000",
      location: "Hyderabad",
      type: "Full-Time",
      desc: "Analyze datasets, prepare reports, and work with Excel & Power BI.",
    },
    {
      title: "HR Executive",
      company: "WorkWave",
      salary: "₹18,000 - ₹28,000",
      location: "Pune",
      type: "Full-Time",
      desc: "Manage hiring process, onboarding, employee communication.",
    },
    {
      title: "Customer Support Executive",
      company: "TalkDesk",
      salary: "₹12,000 - ₹20,000",
      location: "Delhi",
      type: "Full-Time",
      desc: "Handle customer calls, queries and maintain CRM reports.",
    },
    {
      title: "Sales Executive",
      company: "GrowthCorp",
      salary: "₹20,000 + Incentives",
      location: "Jaipur",
      type: "Full-Time",
      desc: "Drive sales, onboard clients, and achieve monthly targets.",
    },
  ],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
});

export default jobSlice.reducer;
