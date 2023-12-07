import React, { useState } from "react";
import axios from "axios";
import xml2js from "xml2js";
import SearchNav from "./SearchNav";

const SearchList = ({ setSearchFail, setSearchFail2 }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const publicUrl = process.env.PUBLIC_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/search", {
        params: { q: searchQuery },
      });

      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);

      console.log("Search Results:", result);

      const items = result.object ? result.object.item || [] : [];
      setSearchResults(items);

      // 검색 결과에 따라 상태 업데이트
      setSearchFail(items.length === 1);
      //1개라도 없으면 실패
      setSearchFail2(items.length === 0);
    } catch (error) {
      console.error("Error during book search:", error);

      // 검색에 실패한 경우 상태 업데이트
      setSearchFail(false); // 검색 성공 상태 초기화
      setSearchFail2(true);
    }
  };

  return (
    <div>
      <form>
        <button onClick={handleSearch}>
          <img src={`${publicUrl}/images/submit.svg`} alt="검색" />
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery("")}>
          <img src={`${publicUrl}/images/reset.svg`} alt="초기화" />
        </button>
      </form>
      <div className="searchNavList">
        <SearchNav />
      </div>

      {/* 검색 결과 표시 */}
      <ul className="searchList">
        {searchResults.map((result) => (
          <li key={result.itemId}>
            <img src={result.cover} alt={result.title} />
            <p>제목 - {result.title}</p>
            <p>작가 - {result.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
