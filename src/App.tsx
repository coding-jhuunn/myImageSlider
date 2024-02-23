import { useState, useEffect } from "react";
import userData from "../data/user.json";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
const BASE_API = "https://api.multiavatar.com/";

function App() {
  const range = userData.users.length - 1;

  const [count, setCount] = useState<number>(0);
  const [uname, setUName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>("");

  const nextUser = () => {
    if (count >= range) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const prevUser = () => {
    if (count >= 1) {
      setCount(count - 1);
    } else {
      setCount(range);
    }
  };

  const fetchProfile = (nav: number) => {
    setLoading(true);

    fetch(BASE_API + userData.users[nav].name + ".png")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to catch");
        }
        return response.blob();
      })
      .then((data) => {
        setTimeout(() => {
          const imageUrl = URL.createObjectURL(data);
          setAvatar(imageUrl);
          setPosition(userData.users[nav].position);
          setAbout(userData.users[nav].about);
          setUName(userData.users[nav].name);
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile(count);
  }, [count]);
  return (
    <>
      <div
        className="container bg-white p-5 rounded-2xl flex justify-center items-center flex-col gap-3 shadow-2xl  sm:w-[325px] sm:h-[550px;]
       md:w-[425px] md:h-[575px] lg:w-[600px] lg:h-[725px]"
      >
        <div className="container-title flex justify-center items-center text-center h-[5%]">
          <h1 className="font-sans font-bold tracking-widest sm:text-lg md:text-2xl lg:text-3xl">
            Developer Team Members
          </h1>
        </div>
        {loading ? (
          <div className="loading-div flex justify-center items-center  h-[90%] sm:text-base md:text-lg lg:text-2xl">
            Loading...
          </div>
        ) : (
          <div className="inner-container flex items-center h-[90%] gap-5">
            <div className="backBtn-container">
              <button
                className="btn-back font-bold w-[25px] h-[25px] text-2xl flex justify-center items-center opacity-20 hover:opacity-100 sm:w-[12px] md:w-[18px] lg:w-[24px]"
                onClick={() => {
                  prevUser();
                }}
              >
                <SlArrowLeft />
              </button>
            </div>
            <div className="details-container flex flex-col h-[100%]  justify-evenly">
              <div className="img-container flex justify-center lg:pb-3 ">
                <img
                  className=" sm:h-36 md:h-44  lg:h-60 border-blue-200 border-4 rounded-full p-1 hover:border-blue-400"
                  src={avatar}
                  alt=""
                />
              </div>
              <div className="info-container flex flex-col items-center h-[60%] ">
                <h2 className="font-mono text-center bold font-bold sm:text-lg md:text-2xl lg:text-3xl">
                  {uname}
                </h2>
                <h4 className="text-base font-semibold sm:text-center sm:text-sm md:text-lg">
                  {position}
                </h4>
                <p className="text-justify text-xs font-sans pt-5  sm:text-xs md:text-sm lg:text-lg">
                  {about}
                </p>
              </div>
            </div>

            <div className="nextBtn-container ">
              <button
                className="btn-next font-bold w-[25px] h-[25px] text-2xl flex justify-center items-center opacity-20 hover:opacity-100 sm:w-[12px] md:w-[18px] lg:w-[24px]"
                onClick={() => {
                  nextUser();
                }}
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
        )}
        <div className="credits flex justify-center items-center h-[5%]">
          <a
            href="https://github.com/coding-jhuunn/myImageSlider"
            className="opacity-50 hover:opacity-100  text-green-900 "
          >
            coding-jhuunn
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
