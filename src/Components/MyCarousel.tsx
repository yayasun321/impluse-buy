import Carousel from "react-bootstrap/Carousel";
import slide1 from "../assets/Images/Slide1.png";
import slide2 from "../assets/Images/Slide2.png";
import slide3 from "../assets/Images/Slide3.png";

function MyCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={slide1} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide2} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={slide3} />
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
