import React from "react";
export default function Login() {
  React.useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=70ce45fdad1824ccc3dad6c68ef34779"
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data.request_token);
        window.location = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/Auth`;
      });
  }, []);
  return <h1>login</h1>;
}
