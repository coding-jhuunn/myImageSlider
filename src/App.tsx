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
  const [avatarID, setAavatarID] = useState<string>();

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

  const displayUsers = async (nav: number) => {
    setLoading(true);

    try {
      setAavatarID(BASE_API + userData.users[nav].name + ".png");
      const response = await fetch(avatarID as string, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error fetching avatar");
      }
      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);
      console.log(response);
      console.log(data);
      console.log(imageUrl);

      setAvatar(imageUrl);
      setPosition(userData.users[nav].position);
      setAbout(userData.users[nav].about);
      setUName(userData.users[nav].name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    displayUsers(count);
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
