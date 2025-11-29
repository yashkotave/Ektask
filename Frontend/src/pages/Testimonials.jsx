import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addTestimonial } from "../redux/testimonialSlice";

export default function Testimonials() {
  const testimonials = useSelector(
    (state) => state.testimonials.testimonialList
  );

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !review) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addTestimonial({ name, review, rating }));

    setName("");
    setReview("");
    setRating(5);

    alert("Thank you! Your review has been submitted.");
  };

  return (
    <div className="pt-20 px-5">
      
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          What Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Users Say
          </span>
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Real reviews from real Ektask users. Trusted by thousands!
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <p className="text-gray-700 italic text-lg">“{t.review}”</p>

            <div className="mt-4 text-yellow-500 text-xl">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>

            <h4 className="mt-3 font-bold text-blue-600 text-lg">{t.name}</h4>
          </div>
        ))}
      </section>

      {/* SUBMIT REVIEW FORM */}
      <section className="mt-20 max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-5">
          Submit Your Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block font-semibold mb-2">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Review */}
          <div>
            <label className="block font-semibold mb-2">Your Review</label>
            <textarea
              rows="3"
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Write something..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>

          {/* Interactive Star Rating */}
          <div>
            <label className="block font-semibold mb-2">Rating</label>
            <div className="flex space-x-2 text-3xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-yellow-400"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
}
