import React, { Component } from "react";
import Slider from "react-slick";

export default class SwipeToSlide extends Component {
  render() {
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      swipeToSlide: true,
      sliderToScroll: 5,
      // afterChange: function(index) {
      //   console.log(
      //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      //   );
      // }
    };

    const DATA = this.props.data

    return (
        <Slider>
            <div data-slick='{
              "slidesToShow": 4, 
              "slidesToScroll": 4,  
            }'>
                    {
                        DATA && DATA.map((item, index) => {
                            return (
                                <div className='product' key={index}>
                                    <div className='product-img' > <img alt='' src={item.img}/> </div>
                                    <div className='product-title'>{item.name}</div>
                                    <div className='product-desc'>{item.categorie}</div>
                                    {/* <div className='btn'>
                                        <ButtonStroke 
                                            TEXT={ HOME_PT ? HOME_PT[6] : 'Saiba mais' }
                                            WIDTH='160px'
                                            HEIGHT='35px'
                                            BTN_TYPE={3}
                                            TO={'/produtos/' + item.id}/>
                                    </div> */}

                                    {/* { index === 0 &&
                                    <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[6]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 6: e.target.value})}/> } */}
                                </div>
                            )
                        })
                    }
            </div>
        </Slider>
    );
  }
}