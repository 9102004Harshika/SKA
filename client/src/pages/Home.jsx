import React from "react";

const Home = () => {
  return (
    <section className="p-6 text-center">
      <h2 className="text-3xl text-primary font-header font-bold mb-4">
        Welcome to the LMS
      </h2>
      <p className="text-lg text-darkGrey">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac quam at purus auctor tempor. Sed volutpat sollicitudin lectus, euismod faucibus leo lobortis at. Aliquam vitae ligula eget lorem sodales ultricies in ac mi. Suspendisse ac orci nec metus consequat placerat. Sed vel feugiat felis. Sed dapibus metus et tincidunt laoreet. Nullam ac magna nec enim fermentum malesuada et non libero. Phasellus vehicula lectus non tristique posuere. Cras iaculis, velit ac consequat posuere, ligula ante sodales ligula, nec tempor velit justo eu velit. Etiam nec fermentum nunc. Nam interdum augue eget augue dictum convallis. Integer auctor urna vitae turpis vestibulum, sed egestas magna posuere.
      </p>
      <a
        className="text-lg text-primary bg-secondary border-secondary border rounded-md p-2 mt-8 inline-block mr-4"
        href="/register"
      >
        Register Page
      </a>
      <a
        className="text-lg text-primary bg-secondary border-secondary border rounded-md p-2 mt-8 inline-block ml-4"
        href="/login"
      >
        Login Page
      </a>
    </section>
  );
};

export default Home;
