import classes from "./CommentryCarousel2.module.css";
import OwlCarousel from "react-owl-carousel";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const CommentryCarousel2 = ({ events }) => {
  const options = {
    loop: true,
    items: 3,
    margin: 0,
    margin: 20,
    center: true,
    nav: true,
    autoplay: true,
    dots: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 450,
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 1,
      },
      500: {
        items: 1,
      },
      700: {
        items: 2,
      },
      800: {
        items: 3,
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className={classes.carousel_container}>
        <OwlCarousel className="owl-theme" {...options}>
          {events?.map((data, i) => {
            return (
              <div
                key={i}
                className="py-2 bg-gradient-to-r p-6 from-stone-800/80 to-stone-800/70 flex justify-center items-center"
              >
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
                        <ArrowRightIcon
                          sx={{ color: "green", fontSize: "2rem" }}
                        />
                        ` : ${data?.assist?.name}`
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default CommentryCarousel2;
