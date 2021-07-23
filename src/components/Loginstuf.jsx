import React from "react";
export default function Login() {
  React.useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=70ce45fdad1824ccc3dad6c68ef34779"
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
}
