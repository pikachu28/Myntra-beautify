import { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { firestore } from "./firebase";

import "./Profile.css"


let Profile = () => {
  let value = useContext(AuthContext);
  let [totalPosts, setTotalPosts] = useState(0);

  console.log(value);

  useEffect(() => {
    let f = async () => {
      let querySnapshot = await firestore
        .collection("posts")
        .where("username", "==", value.displayName)
        .get();

      console.log("size", querySnapshot.size);
      setTotalPosts(querySnapshot.size);
    };

    f();
  }, []);

  return (
    <>
      {value ? (
        <div>
          <img className="img-profile" src={value.photoURL} alt="profile" />
          <p className="username-profile">{value.displayName}</p>

          <p className="ttpost" >Total Posts: {totalPosts}</p>
        


<Link to="/home">
<button className = "redirect_to_reels" >View Reels</button>
          </Link>

        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Profile;