import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function CommentryCarousel({ events }) {
  return (
    <>
     <Swiper
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
        {events?.map((data, i) => {
          return (
            <SwiperSlide key={i}>
             <div
            className={`
              w-full h-[200px]
            `}
          >
            <div className="py-2 bg-gradient-to-r p-6 from-stone-800/80 to-stone-800/70 flex justify-center items-center">
              <div className="gap-2 flex flex-col justify-start items-start bg-gradient-to-r from-stone-900/100 to-stone-900/100 rounded-lg p-4 w-3/4">
                    <p>Time : {data?.time?.elapsed}`</p>
                    <p>Team : {data?.team?.name}</p>
                    <p>Detail : {data?.detail}</p>
                    <p>
                      {data?.detail.includes("Substitution") ? (
                        <>
                          <ArrowLeftIcon
                            sx={{ color: "red", fontSize: "2rem" }}
                          />
                          ` : ${data?.player?.name}`
                        </>
                      ) : (
                        `Player : ${data?.player?.name}`
                      )}
                    </p>
                    <p>
                      {data?.detail.includes("Substitution") && (
                        <>
                          <ArrowRightIcon sx={{color:"green",fontSize:"2rem"}}/>` : ${data?.assist?.name}`
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
