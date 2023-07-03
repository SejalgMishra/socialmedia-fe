import React, { useEffect } from "react";

const Carousel = ({ images, id }) => {
  const inActive = (index) => {
    if (index === 0) return "active";
  };

  

  return (
    <>
      <div id={`images${id}`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {images.map(({ img, index }) => (
            <li
              data-target={`images${id}`}
              data-slide-to={index}
              className={inActive(index)}
            ></li>
          ))}
        </div>
        <div className="carousel-inner">
            {
                images.map((img , index) => (
                    <div key={index} className={`carousel-item ${inActive(index) }  `} >
                    

            <img src={img.url} className="w-full px-5 h-[700px]" alt={img} />
          </div>
                ))
            }
          
        </div>
        {images.length > 1 &&  <div> <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`images${id}`} 
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`images${id}`} 
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">next</span>
        </button>
        </div>}
       
      </div>
    </>
  );
};

export default Carousel;
