import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import './swipe.scss'

const SwipeToSlide = ({ data }) => {
  
  const carousel = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  if (!data || !data.length) return null;

  return (
    <div className="container">
      <div className="buttons"> <FontAwesomeIcon icon={faCaretLeft}  onClick={handleLeftClick} /> </div>
      <div className="carousel" ref={carousel}>
        {data.map((item, i) => {
          const { categorie, name, img } = item;
          return (
            <div className="product" key={i}>
              <div className="product-image">
                <img src={img} alt={name} />
              </div>
              <div className="product-info">
                <span className="product-title">{name}</span>
                <span className="product-desc">{categorie}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons"> <FontAwesomeIcon icon={faCaretRight} onClick={handleRightClick} /> </div>
    </div>
  );
}

export default SwipeToSlide;
