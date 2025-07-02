import React from "react";

export default function About() {
  return (
    <div className="p-8 bg-white">
      {/* <h2 className="text-3xl font-bold text-center mb-8">About Us</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full h-96 p-6 rounded-lg  bg-white flex flex-col items-start">
          <p className="text-sm text-gray-800 mb-2 font-bold uppercase tracking-wide">
            So glad you are here
          </p>
          <h2 className="text-5xl font-bold text-gray-800">About Us</h2>
          <div className="w-full h-1 bg-blue-600 my-3"></div>
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
            veritatis labore consequuntur corporis, quis autem distinctio atque.
            Quam facilis sapiente consectetur accusantium, vero repellendus
            perferendis, id quisquam quod, accusamus in cum. Deleniti, amet
            ullam rem minima debitis, adipisci dolores magnam sint corporis ipsa
            exercitationem! Nobis, facere accusamus cum itaque in unde?
            Accusantium itaque blanditiis perspiciatis maiores necessitatibus
            amet, facere soluta corporis facilis officia perferendis eum,
            molestiae doloribus, veritatis illo quisquam?
          </p>
        </div>

        <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg"
            alt="Travel 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/21014/pexels-photo.jpg"
            alt="Travel 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg"
            alt="Travel 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
