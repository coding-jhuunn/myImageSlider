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
      <div className="container bg-white w-96 h-[600px] p-5 rounded flex flex-col gap-3">
        <div className="container-title flex justify-center items-center text-center h-[5%]">
          <h1 className="font-sans font-bold text-1xl">
            Developer Team Members
          </h1>
        </div>
        {loading ? (
          <div className="loading-div flex justify-center items-center  h-[90%]">
            Loading...
          </div>
        ) : (
          <div className="inner-container flex items-center h-[90%] ">
            <div className="backBtn-container">
              <button
                className="btn-back font-bold w-[25px] h-[25px] text-2xl flex justify-center items-center opacity-40 hover:opacity-100"
                onClick={() => {
                  prevUser();
                }}
              >
                <SlArrowLeft />
              </button>
            </div>
            <div className="details-container flex flex-col">
              <div className="img-container flex justify-center">
                <img className="h-56" src={avatar} alt="" />
              </div>
              <div className="info-container flex flex-col items-center gap-1">
                <h2 className="text-3xl font-mono text-center bold font-bold">
                  {uname}
                </h2>
                <h4 className="text-base font-semibold">{position}</h4>
                <p className="text-justify text-xs font-sans">{about}</p>
              </div>
            </div>

            <div className="nextBtn-container ">
              <button
                className="btn-next font-bold w-[25px] h-[25px] text-2xl flex justify-center items-center opacity-40 hover:opacity-100"
                onClick={() => {
                  nextUser();
                }}
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
        )}
        <div className="credits flex justify-center items-center h-[10%] ">
          <a href="https://github.com/coding-jhuunn">coding-jhuunn</a>
        </div>
      </div>
    </>
  );
}

export default App;
