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
      <p>{count}</p>

      {loading ? (
        "Fetching"
      ) : (
        <div className="container">
          <div className="img-container">
            <img src={avatar} alt="" />
          </div>

          <div className="info-container">
            <h2>{uname}</h2>
            <h4>{position}</h4>
            <p>{about}</p>
          </div>
          <div className="btn-container">
            <button
              className="btn-back"
              onClick={() => {
                prevUser();
              }}
            >
              <SlArrowLeft />
            </button>
            <button
              className="btn-next"
              onClick={() => {
                nextUser();
              }}
            >
              <SlArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
