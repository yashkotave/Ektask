import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [
    {
      title: "Web Development",
      desc: "Responsive and modern websites using MERN stack.",
      icon: "💻",
    },
    {
      title: "Digital Marketing",
      desc: "Grow your business with SEO, ads & social media marketing.",
      icon: "📈",
    },
    {
      title: "Graphic Designing",
      desc: "Logos, posters, thumbnails, business cards & branding.",
      icon: "🎨",
    },
    {
      title: "Video Editing",
      desc: "Shorts, Reels, YouTube videos, cinematic edits.",
      icon: "🎬",
    },
    {
      title: "App Development",
      desc: "Android/iOS apps with modern UI and high performance.",
      icon: "📱",
    },
    {
      title: "Content Writing",
      desc: "SEO-friendly blogs, website content & copywriting.",
      icon: "✍️",
    },
    {
      title: "UI/UX Designing",
      desc: "Professional user interface and experience design.",
      icon: "🧩",
    },
    {
      title: "Business Consulting",
      desc: "Business growth strategy, branding & digital presence.",
      icon: "🧠",
    },
    {
      title: "Social Media Management",
      desc: "Handling Instagram, Facebook, LinkedIn, brand promotion.",
      icon: "📣",
    },
  ],
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
});

export default serviceSlice.reducer;
