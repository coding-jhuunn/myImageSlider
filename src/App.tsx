import { useEffect, useState } from "react";
import userData from "../data/user.json";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
const BASE_API = "https://api.multiavatar.com/Binx Bon.png";

type UserType = {
  id: number;
  name: string;
  position: string;
  about: string;
};

function App() {
  const range = userData.users.length - 1;

  const [count, setCount] = useState<number>(0);
  const [uname, setUName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  // const [avatar, setAvatar] = useState<string | undefined>();

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

  // const navUser = async () => {
  //   fetch(BASE_API)
  //     .then((response) => {
  //       return response.blob();
  //     })
  //     .then((data) => {
  //       const url = URL.createObjectURL(data);
  //       setAvatar(url);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  console.log(userData.users.length);
  useEffect(() => {
    setUName(userData.users[count].name);
    setPosition(userData.users[count].position);
    setAbout(userData.users[count].about);
  }, [count]);
  return (
    <>
      <p>{count}</p>
      <div className="container">
        <div className="img-container">
          <img src="https://picsum.photos/1080/1080" alt="" />
        </div>
        <div className="info-container">
          <h2>{uname}</h2>
          <h4>{position}</h4>
          <p>{about}</p>
        </div>
        <div className="btn-container">
          <button className="btn-back" onClick={() => nextCount("prev")}>
            <SlArrowLeft />
          </button>
          <button className="btn-next" onClick={() => nextCount("next")}>
            <SlArrowRight />
          </button>
        </div>
      </div>
      <div className="container">{/* <img src={avatar} alt="" /> */}</div>
    </>
  );
}

export default App;
