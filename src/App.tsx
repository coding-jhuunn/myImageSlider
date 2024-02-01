import { useState } from "react";
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
  const nextCount = (nav: string) => {
    if (nav === "next") {
      if (count >= range) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    } else if (nav === "prev") {
      if (count >= 1) {
        setCount(count - 1);
      } else {
        setCount(range);
      }
    }
    console.log(count);
  };

  const navUser = async (answer: string) => {
    setLoading(true);
    nextCount(answer);

    setUName(userData.users[count].name);
    setPosition(userData.users[count].position);
    setAbout(userData.users[count].about);

    setAavatarID(BASE_API + JSON.stringify(uname));

    const abortController = new AbortController();
    const signal = abortController.signal;

    setTimeout(async () => {
      try {
        const response = await fetch(avatarID as string, {
          signal,
        });
        const data = await response.blob();
        const imageUrl = URL.createObjectURL(data);
        console.log(imageUrl);

        setAvatar(imageUrl);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => abortController.abort();
  };

  return (
    <>
      <p>{count}</p>
      <div className="container">
        <div className="img-container">
          <img src={avatar} alt="" />
        </div>
        <div className="info-container">
          <h2>{uname}</h2>
          <h4>{position}</h4>
          <p>{about}</p>
        </div>
        {loading ? (
          "Fetching"
        ) : (
          <div className="btn-container">
            <button className="btn-back" onClick={() => navUser("prev")}>
              <SlArrowLeft />
            </button>
            <button className="btn-next" onClick={() => navUser("next")}>
              <SlArrowRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
