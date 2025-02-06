import React from "react";

function About() {
  return (
    <section 
      className="min-h-[60vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-12"
    >

      {/* Header and description section starts here */}
      <div 
        className="max-w-6xl mx-auto text-center"
      >

        {/* Header section starts here */}
        <h2 
          className="text-3xl sm:text-4xl font-bold ubuntu-regular italic"
        >
          About <span className="text-blue-500 dark:text-amber-500">Health Easy</span>
        </h2>
        {/* Header section ends here */}

        {/* Description section starts here */}
        <p 
          className="mt-4 text-lg text-gray-700 dark:text-gray-300"
        >
          Health Easy is your one-stop solution for seamless healthcare access.
          We connect patients with trusted hospitals, providing an effortless
          way to manage appointments, medical records, and consultations. Our
          mission is to make healthcare more accessible, efficient, and
          transparent.
        </p>
        {/* Description section ends here */}

      </div>
      {/* Header and description section ends here */}

      {/* Features section starts here */}
      <div 
        className="mt-12 grid md:grid-cols-3 gap-8 cursor-default"
      >

        {/* Feature 1 starts here*/}
        <div 
          className="text-center p-6 shadow-md rounded-2xl bg-gray-100 dark:bg-gray-800 transition-transform transform hover:scale-105"
        >
          <h3 
            className="text-xl font-semibold ubuntu-regular italic"
          >
            Fast & Reliable
          </h3>
          <p 
            className="mt-2 text-gray-600 dark:text-gray-400"
          >
            Get instant access to medical services with real-time appointment
            booking.
          </p>
        </div>
        {/* Feature 1 ends here*/}

        {/* Feature 2 starts here*/}
        <div 
          className="text-center p-6 shadow-md rounded-2xl bg-gray-100 dark:bg-gray-800 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Trusted Hospitals
          </h3>
          <p 
            className="mt-2 text-gray-600 dark:text-gray-400"
          >
            We partner with top-rated hospitals to ensure you receive quality
            care.
          </p>
        </div>
        {/* Feature 2 ends here*/}

        {/* Feature 3 starts here*/}
        <div 
          className="text-center p-6 shadow-md rounded-2xl bg-gray-100 dark:bg-gray-800 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold ubuntu-regular italic">
            Secure & Private
          </h3>
          <p 
            className="mt-2 text-gray-600 dark:text-gray-400"
          >
            Your health data is encrypted and protected to maintain your
            privacy.
          </p>
        </div>
        {/* Feature 3 ends here*/}

      </div>
      {/* Features section ends here */}

    </section>
  );
}

export default About;
