import React, { useState } from "react";

import YouTube from "@u-wave/react-youtube";

export default function Youtv({ id }) {
  const [trail, setTrail] = useState([]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/tv/${id}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
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
