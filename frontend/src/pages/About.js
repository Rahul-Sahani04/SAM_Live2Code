import "./AboutStyles.css";
import Navbar from "../components/Navbar";

import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

const About = () => {
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
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

  function navigateTo(path="/") {
    navigate(path)
  }

  return (
    <div className="about  leading-relaxed tracking-wide flex flex-col">
      <Navbar links={["Home", "About", "Contact"]} atag={["about", "team"]} />

      <div className="container mx-auto h-screen">
        <div data-aos="fade-right" className="text-center px-3 lg:px-0">
          <h1 className="heading mt-4 text-9xl md:text-3xl lg:text-5xl  leading-tight imgHover">
            SAM
          </h1>
          <p className="leading-normal  text-base md:text-xl lg:text-2xl mb-8">
            Unlock the World of Sign Language
          </p>

          <div className="w-full flex items-center justify-center p-6">
            <button
            onClick={() => navigateTo("/sign_recog")}
            className="mx-auto lg:mx-0 hover:underline gradient2  font-extrabold rounded my-6 py-4 px-8 shadow-lg">
              Get Started
            </button>
          </div>
          {/* <a
            href="#"
            className="inline-block mx-auto lg:mx-0 hover:underline bg-transparent  font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8"
          >
            View Additional Action
          </a> */}
        </div>
        <div
        data-aos="fade-up"
        className="w-full flex items-center justify-center p-6 ">
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
      </div>

      <section className="bg-gray-800 border-b py-8" id="about">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl  leading-tight text-center ">
            About Us
          </h2>
          <div 
          data-aos="zoom-in-up"
          className="w-full flex items-center justify-center p-6">
            {/* IMAGE */}
            <img
              style={{
                width: "40%",
              }}
              src={image1}
              alt="image1"
            />
          </div>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto  w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="xl:w-10/12 sm:1/2 p-6">
              <h3 className="text-3xl  font-bold leading-none mb-3">
                Sign-to-Speech Translation
              </h3>
              <p
              data-aos="fade-right"
              className=" mb-8">
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
            <div className="sm:w-1/2 xl:w-full  p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl  font-bold leading-none mb-3">
                  Key Features
                </h3>
                <p 
                data-aos="fade-right"
                className=" mb-8">
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
        </div>

        {/* </div> */}
      </section>

      <section className="border-b py-8 about">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl  leading-tight text-center ">
            User Guide
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto  w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div
          data-aos="fade-up"
          className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <div className="w-full text-xl  px-6 mt-6">
                  <ol>
                    <li>
                      <b>Step 1: Setup the software</b>
                      <ol>
                        <li>
                          1. Access the website: Begin by accessing our
                          sign-to-speech translation software.
                        </li>
                        <li>
                          2. Connect a webcam: Ensure that you have a functional
                          webcam connected to your system, as this will be used
                          to capture your sign language gestures.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br />

                  <ol>
                    <li>
                      <b>Step 2: Launch and configure the software</b>
                      <ol>
                        <li>
                          1. Open the website: Launch the sign-to-speech
                          software on your browser.
                        </li>
                        <li>
                          2. Select User settings: Configure your user settings,
                          such as camera preferences, sign language preference
                          (e.g., American Sign Language, British Sign Language),
                          and text-to-speech options (e.g., voice, speed,
                          language).
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br />
                </div>
              </a>
            </div>
          </div>

          <div
          data-aos="fade-up"
          className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <div className="w-full text-xl  px-6 mt-6">
                  <ol>
                    <li>
                      <b>Step 3: Start using the software</b>
                      <ol>
                        <li>
                          1. Position yourself: Sit in front of your computer's
                          webcam in a well-lit environment. Make sure your hands
                          and upper body are visible within the camera's frame.
                        </li>
                        <li>
                          2. Calibration (optional): Some software may require
                          initial calibration to recognize your specific signing
                          style and gestures accurately. Follow the on-screen
                          instructions to perform any necessary calibration
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br />

                  <ol>
                    <li>
                      <b>Step 4: Sign recognition and translation</b>
                      <ol>
                        <li>
                          1. Start signing: Begin signing in front of the
                          webcam. The software will capture your sign language
                          gestures in real-time.
                        </li>
                        <li>
                          2. Gesture recognition: The software's backend will
                          process the video feed from the webcam using computer
                          vision algorithms. These algorithms analyze your hand
                          movements, positions, and facial expressions to
                          recognize signs.
                        </li>
                        <li>
                          3. Translate to text: As each sign is recognized, the
                          software will convert it into its corresponding
                          character or letter. This is typically displayed in a
                          text box on the screen. The software may also provide
                          feedback by highlighting the recognized sign or
                          character.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br />
                </div>
              </a>
            </div>
          </div>

          <div
          data-aos="fade-up"
          className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="content-container flex-1  rounded-t rounded-b-none overflow-hidden shadow">
              <a
                href="#"
                className="flex flex-wrap no-underline hover:no-underline"
              >
                <div className="w-full text-xl  px-6 mt-6">
                  <ol>
                    <li>
                      <b>Step 5: Review and Edit</b>
                      <ol>
                        <li>
                          1. Review the tect: Carefully review the text in the
                          text box to ensure it accurately represents the signs
                          you made. The software may not be perfect and may make
                          occasional errors.
                        </li>
                        <li>
                          2. Edit if necessary: If there are any inaccuracies or
                          misinterpretations in the text, you can manually edit
                          the text in the text box to correct them.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <br />

                  <ol>
                    <li>
                      <b>Step 6: Generate Speech</b>
                      <ol>
                        <li>
                          1. Text-to-Speech Conversion: Once you are satisfied
                          with the text representation of your signs, you can
                          click a button or select an option to initiate
                          text-to-speech conversion.
                        </li>
                        <li>
                          2. Speech Output: The software will use a
                          text-to-speech synthesis engine to convert the text
                          into audible speech. You will hear the spoken words or
                          sentences through your computer's speakers or
                          headphones.
                        </li>
                      </ol>
                    </li>
                  </ol>
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
