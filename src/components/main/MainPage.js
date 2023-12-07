import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import xml2js from "xml2js";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./swiper.css";
import "./MainPage.css";
import MainPage1 from "./MainPage1";

const MainPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 베스트셀러 API 호출
        const bestSellerResponse = await axios.get(
          "http://localhost:3001/main/best"
        );
        const bestSellerParser = new xml2js.Parser();
        const bestSellerResult = await bestSellerParser.parseStringPromise(
          bestSellerResponse.data
        );

        // 베스트셀러만 가져오기
        const bestSellers = bestSellerResult.object.item || [];

        // 서버에서 받은 결과를 상태에 설정 (undefined일 경우 빈 배열로 설정)
        setSearchResults(bestSellers);
      } catch (error) {
        console.error("Error during book search:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="main-container">
      <h2 className="best-seller-title">베스트셀러</h2>
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
        className="mySwiper fade-in">
        {searchResults.map((result) => (
          <SwiperSlide key={result.isbn}>
            <div className="best-seller-item">
              <p style={{ backgroundColor: "orange" }}>{result.title}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <img src={result.cover} alt={result.title} />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <MainPage1 />
    </div>
  );
};

export default MainPage;
