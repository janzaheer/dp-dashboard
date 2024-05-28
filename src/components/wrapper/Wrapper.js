import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      id: 1,
      cover: <i className='fa-solid fa-truck-fast'></i>,
      title: "Worldwide Delivery",
      decs: "Enjoy fast, reliable Pakistan-wide delivery for all your favorite products. Shop now.",
    },
    {
      id: 2,
      cover: <i className='fa-solid fa-id-card'></i>,
      title: "Safe Payment",
      decs: "Enjoy the convenience of cash on delivery with our secure and reliable payment options.",
    },
    {
      id: 3,
      cover: <i className='fa-solid fa-shield'></i>,
      title: "Shop With Confidence",
      decs: "Shop with confidence knowing your satisfaction and security are our top priorities.",
    },
    {
      id: 4,
      cover: <i className='fa-solid fa-headset'></i>,
      title: "24/7 Support",
      decs: "Enjoy 24/7 support for all your needs, any time, day or night.",
    },
  ]
  return (
    <>
      <section className="wrapper my-5">
        <div className="container">
          <div className="row">
            {data.map((val) => {
              return (
                <div key={val.id} className=" col-12 col-md-6 col-lg-3 ">
                  <div className="card border border-secondary shadow-sm m-1 d-flex align-items-center justify-content-center"
                  >
                    <div className='img mt-4'>
                      <i>{val.cover} </i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{val.title}</h5>
                      <p className="text-muted text-wrap">{val.decs}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Wrapper
