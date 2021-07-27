import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "./context";

export default function Removefavtv() {
  const { user, sessionId } = useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/account/${user?.id}/favorite?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${sessionId}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        media_type: "tv",
        media_id: id,
        favorite: false,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        history.replace(`/Favlist`);
      });
  });
  return null;
}
