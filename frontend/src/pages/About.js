import "./AboutStyles.css";
import Navbar from "../components/Navbar";

import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";

import { useEffect, useState } from "react";

const About = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const heading = document.querySelector(".animated-heading");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const threshold = 10;

      if (scrollY > threshold) {
        setScrolling(true);
        heading.style.transform = `translateX(${scrollY - threshold - 200}%)`;
      } else {
        setScrolling(false);
        heading.style.transform = "translateX(-220%)";
      }
    });
  }, []);

  return (
    <div className="about  leading-relaxed tracking-wide flex flex-col">
      <Navbar links={["Home", "About", "Contact"]} atag={["about", "team"]} />

      <div className="container mx-auto h-screen">
        <div className="text-center px-3 lg:px-0">
          <h1 className=" mt-4 text-8xl md:text-3xl lg:text-5xl  leading-tight imgHover">
            SAM
          </h1>
          <p className="leading-normal  text-base md:text-xl lg:text-2xl mb-8">
            Unlock the World of Sign Language
          </p>

          <button className="mx-auto lg:mx-0 hover:underline  font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48">
            Get Started
          </button>
          <a
            href="#"
            className="inline-block mx-auto lg:mx-0 hover:underline bg-transparent  font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8"
          >
            View Additional Action
          </a>
        </div>
        {/* 
        // <div className="flex items-center w-full mx-auto content-end">
        //   <div className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12  w-1/2 rounded shadow-xl"> test</div>
        // </div> */}
        <div className="w-full flex items-center justify-center p-6 ">
          {/* IMAGE */}
          <img
            className=""
            style={{
              width: "30%",
            }}
            src={image2}
            alt="image2"
          />
          <h2 className="animated-heading left-6/12  -z-10 text-7xl font-bold absolute items-center justify-center text-align">
            SIGN LANGUAGE
          </h2>
        </div>
        <div className="w-full flex items-center justify-center p-6">
          {/* IMAGE */}
          <img
            style={{
              width: "40%",
            }}
            src={image1}
            alt="image1"
          />
        </div>
      </div>

      <section className="bg-gray-800 border-b py-8" id="about">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl  leading-tight text-center ">
            About Us
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto  w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl  font-bold leading-none mb-3">
                Sign-to-Speech Translation
              </h3>
              <p className=" mb-8">
                Sign language is a rich and expressive form of communication
                used by millions of people around the world who are deaf or hard
                of hearing. However, for those who do not understand sign
                language, communication can be challenging. To bridge this
                communication gap, we have developed a React project that
                leverages cutting-edge technology to facilitate sign language to
                speech translation. Our project aims to make communication more
                accessible and inclusive for all.
                <br />
                <br />
                <hr />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl  font-bold leading-none mb-3">
                  Key Features
                </h3>
                <p className=" mb-8">
                  <ol type="1">
                    <li>
                      <b>1. Sign Language Recognition:</b> Our project employs
                      computer vision techniques to detect and interpret sign
                      language gestures made by the user. This is achieved
                      through real-time video processing and machine learning
                      algorithms.
                    </li>
                    <br />
                    <li>
                      <b>2. Text Generation: </b>Once the sign language gestures
                      are recognized, our system translates them into
                      corresponding letters or words in real-time. This
                      generated text serves as the basis for speech synthesis.
                    </li>
                    <br />
                    <li>
                      <b>3. Text-to-Speech Integration: </b> We have integrated
                      Google's Text-to-Speech API to convert the generated text
                      into natural-sounding speech. This feature enables our
                      project to audibly convey the sign language message to
                      others.
                    </li>
                    <br />
                    <li>
                      <b>4. Accesibility: </b>Our React project is designed with
                      accessibility in mind, ensuring that it can be used by
                      individuals with various levels of technological
                      proficiency. The user interface is intuitive and
                      user-friendly.
                    </li>
                    <br />
                    <li>
                      <b>5. Customization: </b>Users have the option to
                      customize the speech output, including choosing the voice,
                      language, and speech rate that best suits their
                      preferences and needs.
                    </li>
                  </ol>
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex-none mt-auto  rounded-b rounded-t-none overflow-hidden shadow p-6"> */}
          <div className="flex items-center justify-start">
            <button className="mx-auto lg:mx-0 hover:underline gradient2  font-extrabold rounded my-6 py-4 px-8 shadow-lg">
              Action
            </button>
          </div>
        </div>

        {/* </div> */}
      </section>

      <section className="border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl  leading-tight text-center ">
            Getting Started
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto  w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                {/* <p className="w-full  text-xs md:text-sm px-6 mt-6">About Us</p> */}
                <div className="w-full font-bold text-xl  px-6 mt-6">
                  Sign-to-Speech translation :
                </div>
                <p className=" text-base px-6 mb-5">
                  Sign language is a rich and expressive form of communication
                  used by millions of people around the world who are deaf or
                  hard of hearing. However, for those who do not understand sign
                  language, communication can be challenging. To bridge this
                  communication gap, we have developed a React project that
                  leverages cutting-edge technology to facilitate sign language
                  to speech translation. Our project aims to make communication
                  more accessible and inclusive for all.
                </p>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full  text-xs md:text-sm px-6 mt-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl  px-6">
                  Lorem ipsum dolor sit amet.
                </div>
                <p className=" text-base px-6 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <p className="w-full  text-xs md:text-sm px-6 mt-6">
                  GETTING STARTED
                </p>
                <div className="w-full font-bold text-xl  px-6">
                  Lorem ipsum dolor sit amet.
                </div>
                <p className="  text-base px-6 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
