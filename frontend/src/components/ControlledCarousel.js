import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='rounded'>
        <img src='https://techbiz.vn/attachments/1671172015866-jpeg.153/' alt='First slide' className='rounded' />
        <Carousel.Caption>
          <h3>Avatar 2: Dòng chảy của nước</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='rounded'>
        <img src='https://www.vietnam.vn/daknong/wp-content/uploads/2024/10/Review-phim-Venom-3-Keo-cuoi.vn-139269124445442048-2024-9-14-_photo-1726305310973-17263053111221748361394-172632189.jpeg' alt='First slide' className='rounded' />
        <Carousel.Caption>
          <h3>Venom :Hồi kết</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='rounded'>
        <img src='https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/phim-chieu-rap-1.jpg' alt='First slide' className='rounded' />
        <Carousel.Caption>
          <h3>Gặp lại chị bầu</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;