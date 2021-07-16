// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// export default function Picout() {
//   const { id } = useParams();
//   const [image, setImages] = useState([]);
//   React.useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/person/${id}/images?api_key=70ce45fdad1824ccc3dad6c68ef34779`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setImages(data.profiles.file_path);
//         console.log(data);
//       });
//   }, []);
//   return (
//     <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${image}`} />
//   );
// }
