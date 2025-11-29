export default function Contact() {
  return (
    <div className="pt-20 px-5">

      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Ektask
          </span>
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have a question? Need help? Want to know more?  
          Write to us — we respond quickly!
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="bg-white shadow-lg p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-5">Our Contact Details</h2>

          <div className="space-y-6">

            <div className="flex gap-4 items-start">
              <div className="text-blue-600 text-3xl">📍</div>
              <div>
                <h4 className="font-semibold">Office Location</h4>
                <p className="text-gray-600">Indore, Madhya Pradesh, India</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-purple-600 text-3xl">📞</div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">+91 98765 12345</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-green-600 text-3xl">📧</div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">support@ektask.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-yellow-500 text-3xl">⏰</div>
              <div>
                <h4 className="font-semibold">Working Hours</h4>
                <p className="text-gray-600">Mon - Sat: 9 AM to 7 PM</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-5">Send Us a Message</h2>

          <form className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message…"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition">
              Send Message
            </button>
          </form>
        </div>

      </section>

    </div>
  );
}
