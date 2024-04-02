import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import { useDispatch } from "react-redux";
import { openHandler } from "../../slices/slideUp";

//playerName and number

const TeamLineups2 = ({ homeTeam, startXI }) => {
  const [grid_1, setGrid_1] = useState([]);
  const [grid_2, setGrid_2] = useState([]);
  const [grid_3, setGrid_3] = useState([]);
  const [grid_4, setGrid_4] = useState([]);
  const [grid_5, setGrid_5] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setGrid_1(startXI?.filter((data) => data?.player?.grid?.startsWith("1")));
    setGrid_2(startXI?.filter((data) => data?.player?.grid?.startsWith("2")));
    setGrid_3(startXI?.filter((data) => data?.player?.grid?.startsWith("3")));
    setGrid_4(startXI?.filter((data) => data?.player?.grid?.startsWith("4")));
    setGrid_5(startXI?.filter((data) => data?.player?.grid?.startsWith("5")));
  }, [startXI]);

  const getPlayerDetails = async (id) => {
    dispatch(openHandler(id));
  };



  return (
    <>
      {homeTeam ? (
        <div className="flex flex-col justify-center items-center gap-0 px-10">
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_1.length}, 1fr)`,
            }}
          >
            {grid_1.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle number={player?.number} count={player?.count}/>
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_2.length}, 1fr)`,
            }}
          >
            {grid_2.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle number={player?.number} count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_3.length}, 1fr)`,
            }}
          >
            {grid_3.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle number={player?.number}  count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_4.length}, 1fr)`,
            }}
          >
            {grid_4.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle number={player?.number} count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_5.length}, 1fr)`,
            }}
          >
            {grid_5.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle number={player?.number}  count={player?.count}/>
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : !homeTeam ? (
        <div className="flex flex-col justify-center items-center gap-2 px-10">
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_5.length}, 1fr)`,
            }}
          >
            {grid_5.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle colorChange={true} number={player?.number}  count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_4.length}, 1fr)`,
            }}
          >
            {grid_4.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle colorChange={true} number={player?.number}  count={player?.count}/>
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_3.length}, 1fr)`,
            }}
          >
            {grid_3.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle colorChange={true} number={player?.number}  count={player?.count}/>
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_2.length}, 1fr)`,
            }}
          >
            {grid_2.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle colorChange={true} number={player?.number} count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid_1.length}, 1fr)`,
            }}
          >
            {grid_1.map((data, i) => {
              const { player } = data;
              return (
                <div key={i} className=" flex justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                  >
                    <Circle colorChange={true} number={player?.number} count={player?.count} />
                    <p className="text-lg text-white max-[600px]:text-sm">
                      {player.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TeamLineups2;
