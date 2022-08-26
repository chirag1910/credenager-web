import styles from "../../styles/landingPage/carousel.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const BGCarousel = () => {
    const carouselImages = [
        "./mockup_1.webp",
        "./mockup_2.webp",
        "./mockup_3.webp",
        "./mockup_4.webp",
        "./mockup_5.webp",
        "./mockup_6.webp",
    ];
    const responsive = {
        any: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <div className={styles.carousel}>
                <Carousel
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    draggable={false}
                    swipeable={false}
                    deviceType="any"
                    arrows={false}
                >
                    {carouselImages.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            alt="Project Screeshots/Mockups"
                        />
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default BGCarousel;
