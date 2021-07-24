import React, { useState } from "react";

import YouTube from "@u-wave/react-youtube";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "./styles.css";

export default function You({ id }) {
  const [trail, setTrail] = useState([]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrail(data.results[0]);
      });
  }, [id]);
  return (
    <div>
      <YouTube video={trail?.key} />
    </div>
  );
}
