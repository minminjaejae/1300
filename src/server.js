const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// CORS 미들웨어 추가
app.use(cors());

// Preflight 요청을 허용
app.options("*", cors());

// 도서 검색 엔드포인트
/* app.get("/about", async (req, res) => {
  try {
    // 알라딘 API 요청을 서버에서 보냄
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemList.aspx",
      {
        params: {
          ttbkey: "ttbdnjswns62621635002", // 여기에 실제 TTBKey를 넣어주세요
          QueryType: "Bestseller",
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "xml",
          Version: "20131101",
          ...req.query, // 클라이언트로부터 받은 추가 쿼리 파라미터
          Sort: "SalesPoint",
        },
      }
    );

    // 알라딘 API 응답을 클라이언트에게 전달
    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); */
app.get("/search", async (req, res) => {
  try {
    const searchValue = req.query.q;
    // 알라딘 API 요청을 서버에서 보냄
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx",
      {
        params: {
          ttbkey: "ttbdnjswns62621635002", // 여기에 실제 TTBKey를 넣어주세요
          QueryType: "Keyword",
          Query: searchValue,
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "xml",
          Version: "20131101",
        },
      }
    );

    // 알라딘 API 응답을 클라이언트에게 전달
    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 시작 부분 - 베스트셀러
app.get("/main/best", async (req, res) => {
  try {
    const searchValue = req.query.q;
    // 알라딘 API 요청을 서버에서 보냄
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemList.aspx",
      {
        params: {
          ttbkey: "ttbdnjswns62621635002", // 여기에 실제 TTBKey를 넣어주세요
          QueryType: "Bestseller",
          Query: searchValue,
          Cover: "Big",
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "xml",
          Version: "20131101",
        },
      }
    );

    // 알라딘 API 응답을 클라이언트에게 전달
    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 끝 부분 - 베스트셀러
// 시작 부분 - 신간
app.get("/main/new", async (req, res) => {
  try {
    const searchValue = req.query.q;
    // 알라딘 API 요청을 서버에서 보냄
    const response = await axios.get(
      "http://www.aladin.co.kr/ttb/api/ItemList.aspx",
      {
        params: {
          ttbkey: "ttbdnjswns62621635002", // 여기에 실제 TTBKey를 넣어주세요
          QueryType: "ItemNewSpecial",
          Query: searchValue,
          Cover: "Big",
          MaxResults: 10,
          start: 1,
          SearchTarget: "Book",
          output: "xml",
          Version: "20131101",
        },
      }
    );

    // 알라딘 API 응답을 클라이언트에게 전달
    res.json(response.data);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001; // 8080이 백엔드 기본호출
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
