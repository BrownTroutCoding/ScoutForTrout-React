import Background from '../assets/images/underwater.jpg';


function About() {
  return (
    <div
    // background
    style={{ backgroundImage: `url(${Background})` }}
    className="flex justify-center bg-cover bg-fixed">
      <div className="flex flex-col items-center min-h-screen mt-5">
        <div className="text-center sm:p-3 text-slate-100 rounded-lg border bg-black bg-opacity-70">
          <h2 className="about-heading mb-6">
            Scout for Trout
          </h2>
          <p>
          Scout for Trout is an emerging platform that revolutionizes the fly-fishing experience.
          Designed with the angler in mind, it allows users to effortlessly save and manage their
          preferred fishing locations, complete with a unique name, comprehensive description, and
          a handy map pin. With a single click, users can copy this map pin, providing instant access
          to directions for their next fishing expedition. In addition, the application offers
          invaluable real-time information on river conditions in the Gallatin Valley, including
          cubic feet per second and temperature data, courtesy of the USGS. Scout for Trout is not
          just a tool, but a companion, making every fishing adventure more convenient and fruitful.
          </p>
          <p className="mt-5">
            Stay tuned as we develope this app to include river fishing recommendations
            based on water temperature, CFS, hatches, and more!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

