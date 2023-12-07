import React, { useState } from "react";
import SearchList from "./SearchList";
import "./search.css";

const SearchHome = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const [searchFail, setSearchFail] = useState(true);
  const [searchFail2, setSearchFail2] = useState(false);

  return (
    <div>
      <hr />
      <img src={`${publicUrl}/images/logo.svg`} alt="로고" className="logo" />
      <hr />
      <div className="main">
        <SearchList
          setSearchFail={setSearchFail}
          setSearchFail2={setSearchFail2}
        />
      </div>
      <div className={`fail ${searchFail ? "" : "hidden"}`}>
        <img src={`${publicUrl}/images/search.svg`} alt="검색실패" />
        <img src={`${publicUrl}/images/why.svg`} alt="물음표" />
        <p>무엇을 검색하시겠습니까 ?📚</p>
      </div>
      <div className={`fail2 ${searchFail2 ? "block" : "hidden"}`}>
        <img src={`${publicUrl}/images/search.svg`} alt="검색실패" />
        <img src={`${publicUrl}/images/why.svg`} alt="물음표" />
        <p>검색에 실패했습니다... 😵</p>
      </div>
    </div>
  );
};

export default SearchHome;
