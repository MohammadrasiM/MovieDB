import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "./context";
import { message } from "antd";
export default function Auth() {
  const { setSessionId } = useContext(UserContext);
  const history = useHistory();
  const locaton = useLocation();

  const requestToken = new URLSearchParams(locaton.search).get("request_token");
  useEffect(() => {
    if (requestToken) {
      const url =
        "https://api.themoviedb.org/3/authentication/session/new?api_key=70ce45fdad1824ccc3dad6c68ef34779";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_token: requestToken,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setSessionId(data.session_id);
          history.replace("/");

          fetch(
            `https://api.themoviedb.org/3/account?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${data.session_id}`
          )
            .then((r) => r.json())
            .then((d) => {
              message.success(`Welcome ${d?.username}`);
            });
        });
    }
  }, [requestToken]);

  return <h1 style={{ color: "white" }}>Heelio</h1>;
}
