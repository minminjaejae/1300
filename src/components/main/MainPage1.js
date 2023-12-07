import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import xml2js from "xml2js";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./swiper.css";
import "./MainPage.css"; // 제공해주신 CSS 파일을 import

const MainPage1 = () => {
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        // 신간 API 호출
        const newBooksResponse = await axios.get(
          "http://localhost:3001/main/new"
        );
        const newBooksParser = new xml2js.Parser();
        const newBooksResult = await newBooksParser.parseStringPromise(
          newBooksResponse.data
        );

        // 서버에서 받은 결과를 상태에 설정 (undefined일 경우 빈 배열로 설정)
        setNewBooks(newBooksResult.object.item || []);
      } catch (error) {
        console.error("새 책을 검색하는 중 오류 발생:", error);
      }
    };

    fetchNewBooks();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="main-container">
      <h2 className="best-seller-title">신간</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper">
        {newBooks.map((book) => (
          <SwiperSlide key={book.isbn} className="best-seller-item fade-in">
            <div>
              <p style={{ backgroundColor: "skyblue" }}>{book.title}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="best-seller-item-img"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainPage1;
