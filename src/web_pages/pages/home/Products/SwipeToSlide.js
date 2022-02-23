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
      <div className="carousel" ref={carousel}>
        {data.map((item) => {
          const { id, name, price, img } = item;
          return (
            <div className="item" key={id}>
              <div className="image">
                <img src={img} alt={name} />
              </div>
              <div className="info">
                <span className="name">{name}</span>
                <span className="oldPrice">U$ tes</span>
                <span className="price">U$ {price}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <FontAwesomeIcon icon={faCaretLeft}  onClick={handleRightClick} />
        <FontAwesomeIcon icon={faCaretRight} onClick={handleLeftClick} />
      </div>
    </div>
  );
}

export default SwipeToSlide;
