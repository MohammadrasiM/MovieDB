import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Affix, Card } from "antd";
export default function Moviedetail() {
  const { id } = useParams();
  const [container, setContainer] = useState(null);
  const [state, setState] = useState([]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  return (
    <div className="scrollable-container" ref={setContainer}>
      <div style={{ paddingBottom: 1000 }} className="background">
        <Affix target={() => container}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src={
                  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                    state.profile_path || state.poster_path
                  }` || `https://image.tmdb.org/t/p/w500${state.poster_path}`
                }
              />
            }
          ></Card>
        </Affix>
      </div>
    </div>
  );
}
