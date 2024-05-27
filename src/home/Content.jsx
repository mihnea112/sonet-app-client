import React from "react";
import Balls from "./Balls";

function Content() {
    
  return (
    <section className="content">
      <Balls></Balls>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-emerald-300"
              data-aos="zoom-y-out"
            >
              Bine ati venit pe{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-700">
                Sonet App
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-emerald-300 mb-8 "
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Solutia smart de a scrie si transmite mai departe mesajele din sonete, si nu numai.<br></br> Pentru cei care scriu urat sau vor ca mesajele lor sa fie unice.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center sm:mb-3"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div className="mb-8">
                  <a
                    className="btn text-emerald-300 bg-emerald-800 hover:bg-emerald-600 w-full mb-4 sm:w-auto sm:mb-0 p-3 rounded"
                    href="#0"
                  >
                    Login/Register
                  </a>
                </div>
                <div>
                  <a
                    className="btn text-emerald-800 bg-emerald-300 hover:bg-emerald-600 w-full sm:w-auto sm:ml-4 p-3 rounded"
                    href="/despre"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
