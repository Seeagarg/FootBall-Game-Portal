import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import MatchLayout from "./MatchLayout";

export default function MatchCarousel({ matches }) {
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
        loop={true}
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
        {matches?.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="w-full pb-10">
                <MatchLayout
                  key={i}
                  homeTeamLogo={data?.homeLogo}
                  homeTeamName={data?.homeTeam}
                  awayTeamLogo={data?.awayLogo}
                  awayTeamName={data?.awayTeam}
                  matchDate={data?.date}
                  matchTime={data?.time}
                  matchTimeZone={data?.timeZone}
                  matchVenue={data?.venue}
                  matchVS="VS"
                  matchStatus={data?.matchStatus}
                  homeTeamGoals={data?.homeGoals}
                  awayTeamGoals={data?.awayGoals}
                  matchLive={false}
                  matchTimeLive={data?.matchTime}
                  matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
