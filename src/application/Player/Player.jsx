import React from "react";
import { changeFullScreen } from "../../store/Slices/playerSlice";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { useDispatch, useSelector } from "react-redux";
const Player = () => {
  const dispatch = useDispatch();
  const {
    fullScreen,
    playing,
    currentIndex,
    playList,
    mode,
    sequencePlayList,
  } = useSelector((store) => store.player);

  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };
  return (
    <>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        changeFullScreen={changeFullScreen}
      ></MiniPlayer>
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        changeFullScreen={changeFullScreen}
      ></NormalPlayer>
    </>
  );
};

export default Player;
