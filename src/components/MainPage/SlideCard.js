import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import d2 from '../assets/images/s1.png'
import d4 from '../assets/images/s2.png'

const SlideCard = () => {

  const Sliddata = [
    {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: `${d2}`,
      price: 20000
    },
    {
      id: 2,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: `${d4}`,
      price: 20000
    }
  ]

  const [sd, setSd] = useState([])

  useEffect(() => {
    sliderFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sliderFunc = () => {
    let data = Sliddata
    setSd(data)
  }


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <div className="">
        <Slider {...settings}>
          {sd.map((value) => {
            return (
              <div key={value?.id} id="carouselExampleDark" className="carousel carousel-dark sli" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval={10000}>
                    <img src={value.cover} height={400} className="d-block w-100 slideImage" alt="..." />
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

export default SlideCard
