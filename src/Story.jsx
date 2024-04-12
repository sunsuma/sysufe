import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsPen, BsArrowLeft } from "react-icons/bs";
import Popular from "./Popular";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import SwiperCore, { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
SwiperCore.use([EffectCoverflow]);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL: "https://dummy1-36202-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
// const List = ref(database, 'List')

const cat = ref(database, "Category");

let initialCategories = [
  "FIGMA",
  "FOOD",
  "ENGINEERING",
  "CINEMA",
  "JOURNALISM",
];

export default function Story() {
  const [swiper, setSwiper] = useState(null);

  const [subject, setSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");
  const [searchResults2, setSearchResults2] = useState([]);

  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState([]);
  const [randomCat, setRandom] = useState([]);
  const [mappable, setMappable] = useState([]);

  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [menu, setMenu] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [content, setContent] = useState(false);

  const [check, setCheck] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [stories, setStories] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [reveal, setReveal] = useState({});

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    onValue(cat, function (snapshot) {
      if (snapshot.exists()) {
        const entries = Object.entries(snapshot.val());
        setCategories(entries.map((item) => item[1]));
        setNewCat(entries.map((item) => item[1]));
        setRandom(entries.map((item) => item[1]));
      }
    });
  }, []);

  useEffect(() => {
    if (randomCat.length > 0) {
      const random = Math.floor(Math.random() * categories.length);
      setCheck(randomCat[random]);
    }
  }, [randomCat]);

  function getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  }

  function handleValue(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "subject") {
      setSubject(value);
    } else if (name === "description") {
      setDescribe(value);
    }
  }

  function handleSearch(e) {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const results = performSearch(searchValue);
    setSearchResults(results);
  }

  function handleSearch2(e) {
    setSearch(e.target.value);
    setMenu(false);
    setShow3(true);

    const results = performSearch2(e.target.value);
    setSearchResults2(results);
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category.toUpperCase());
    setSearchText("");
    setSearchResults([]);
    setShow(false);
  }

  function handleCategorySelect2(category) {
    setSelectedValue("");
    setSearch(category);
    setSearchResults2([]);
    searchBar(category);
  }

  function performSearch(searchValue) {
    const filteredCategories =
      categories &&
      categories.filter((category) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      );

    return filteredCategories;
  }

  function performSearch2(searchValue) {
    const filteredCategories =
      randomCat &&
      randomCat.filter((category) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      );

    return filteredCategories;
  }

  function clear() {
    setSubject("");
    setDescribe("");
    setSearchText("");
    setSelectedCategory("");
  }

  function handleSubmit(e) {
    const random = Math.random() * 4;
    e.preventDefault();
    const Data = {
      subject: subject,
      description: describe,
      category: selectedCategory,
      timeStamp: getCurrentDateTime(),
      id: random,
    };

    if (subject && describe && selectedCategory) {
      push(ref(database, `List/${selectedCategory}`), Data);

      if (selectedCategory) {
        if (
          newCat &&
          !newCat.some(
            (item) => item.toLowerCase() === selectedCategory.toLowerCase()
          )
        ) {
          push(cat, selectedCategory);
        }
        clear();
      }
    }

    // setContent(false)
  }

  function handleShow() {
    setShow((prev) => !prev);
  }

  function handleAdd() {
    setSelectedCategory(searchText.toUpperCase());
    setSearchText("");
    setSearchResults([]);
    setShow(false);

    if (searchText) {
      if (
        initialCategories &&
        !initialCategories.some(
          (item) => item.toLowerCase() === searchText.toLowerCase()
        )
      ) {
        setCategories((prevCategories) => [...prevCategories, searchText]);
        initialCategories.push(searchText);
      }
    }
  }

  function searchBar(cat) {
    cat && setMenu(true);
    setShow3(false);
    setShow4(false);
  }

  function handleClick() {
    setShow3((prev) => !prev);
    setShow4(false);
  }

  function handleClick2() {
    setShow4((prev) => !prev);
    setShow3(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    windowWidth > 425 ? setContent(true) : setContent(false);
  }, [windowWidth]);

  function handleflip() {
    setFlipped((prev) => !prev);
  }

  function handleChildValue(value) {
    setSelectedValue(value);
    setSearch("");
  }

  function formattedDate(dateTimeString) {
    const dateTimeParts = dateTimeString.split("-");

    const day = dateTimeParts[0];
    const month = dateTimeParts[1];
    const year = dateTimeParts[2];

    return `${day}-${month}-${year}`;
  }

  function formattedDate2(dateTimeString) {
    const dateTimeParts = dateTimeString.split("-");

    const day = dateTimeParts[0];
    const month = dateTimeParts[1];
    const year = dateTimeParts[2];

    return `${month}-${day}-${year}`;
  }

  function formattedTime(dateTimeString) {
    const dateTimeParts = dateTimeString.split("-");

    const hours = dateTimeParts[3];
    const minutes = dateTimeParts[4];
    const seconds = dateTimeParts[5];

    return `${hours}-${minutes}-${seconds}`;
  }

  useEffect(() => {
    if (windowWidth > 425) {
      setReveal({});
    } else if (windowWidth <= 425) {
      setShow4(false);
      setShow(false);
    }
  }, [windowWidth]);

  function togglePara(itemId) {
    windowWidth > 425
      ? setExpandedSections((prevExpandedSections) => ({
          ...prevExpandedSections,
          [itemId]: !prevExpandedSections[itemId],
        }))
      : setReveal((prevReveal) => ({
          ...prevReveal,
          [itemId]: !prevReveal[itemId],
        }));
  }

  const revealMain = {
    position: "absolute",
    top: "0px",
    left: windowWidth > 375 ? "-75px" : windowWidth > 320 ? "-90px" : "-80px",
    width: windowWidth > 320 ? "283px" : "250px",
    height: "257px",
    boxShadow: "1px 1px 0px #000000",
  };

  const revealhead = {
    alignSelf: "center",
    width: "194px",
    marginBottom: "8px",
  };

  const revealPara = {
    marginTop: "initial",
    width: "215px",
    overflowY: reveal ? "auto" : "hidden",
    maxHeight: "112px",
    fontSize: "0.625rem",
  };

  function goback() {
    setReveal({});
  }

  useEffect(() => {
    if (selectedValue) {
      onValue(
        ref(database, `List/${selectedValue.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          }
        }
      );
    }
    setReveal({});
  }, [selectedValue]);

  useEffect(() => {
    if (check) {
      onValue(
        ref(database, `List/${check.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          }
        }
      );
    }

    setReveal({});
  }, [check]);

  useEffect(() => {
    if (search) {
      onValue(
        ref(database, `List/${search.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length);
            setMappable(Object.entries(snapshot.val()));
          }
        }
      );
    }
    setReveal({});
  }, [search]);

  function showContent() {
    setContent((prev) => !prev);
  }

  function paragraph(item) {
    if (item) {
      const words = item[1].split(" ");
      const isExpanded = expandedSections[item[2]];
      const isRevealed = reveal[item[2]];

      if (words.length > 24 && !isExpanded) {
        return (
          <div
            className="item-section bg-red-500"
            key={item[2]}
            style={isRevealed ? revealMain : {}}
          >
            <div className="item-category bg-red-500">
              <h3>{item[0]}</h3>
              <p>{formattedDate(item[4])}</p>
            </div>
            {isRevealed && (
              <BsArrowLeft className="left-arrow" onClick={goback} />
            )}
            <h2 style={isRevealed ? revealhead : {}}>{item[3]}</h2>
            <div className="show-para">
              {isRevealed ? (
                <p style={isRevealed ? revealPara : {}}>
                  {item[1].slice(0, item[1].length)}...
                </p>
              ) : (
                <p>{item[1].slice(0, 154)}...</p>
              )}
            </div>
            {windowWidth > 425 ? (
              <span className="read-more" onClick={() => togglePara([item[2]])}>
                Read more...
              </span>
            ) : (
              !isRevealed && (
                <span
                  className="read-more"
                  onClick={() => togglePara([item[2]])}
                >
                  Read more...
                </span>
              )
            )}
          </div>
        );
      } else {
        return (
          <div key={item[2]} style={isRevealed ? revealMain : {}}>
            <div className="item-category">
              <h3>{item[0]}</h3>
              <p>{formattedDate(item[4])}</p>
            </div>
            {isRevealed && (
              <BsArrowLeft className="left-arrow" onClick={goback} />
            )}
            <h2 style={isRevealed ? revealhead : {}}>{item[3]}</h2>
            <div className="show-para">
              <p style={isRevealed ? revealPara : {}}>{item[1]}</p>
            </div>
            {words.length > 24 && windowWidth > 425 ? (
              <span className="read-more" onClick={() => togglePara(item[2])}>
                Read less
              </span>
            ) : (
              words.length > 24 &&
              !isRevealed && (
                <span className="read-more" onClick={() => togglePara(item[2])}>
                  Read more...
                </span>
              )
            )}
          </div>
        );
      }
    }
  }

  function sorted(mappable) {
    const sortedMappable = mappable.sort((a, b) => {
      const dateA = new Date(formattedDate2(Object.values(a[1])[4]));
      const dateB = new Date(formattedDate2(Object.values(b[1])[4]));

      if (dateA < dateB) {
        return flipped ? 1 : -1;
      }

      if (dateA > dateB) {
        return flipped ? -1 : 1;
      }

      const timeA = formattedTime(Object.values(a[1])[4]);
      const timeB = formattedTime(Object.values(b[1])[4]);

      if (timeA < timeB) {
        return flipped ? 1 : -1;
      }
      if (timeA > timeB) {
        return flipped ? -1 : 1;
      }
    });

    return sortedMappable.map((items, index) => {
      const random = Math.random() * 4;
      return (
        <div key={random} className="single-items">
          {paragraph(Object.values(items[1]))}
        </div>
      );
    });
  }

  return (
    <div className="w-90 flex flex-col">
      <Popular onChildValue={handleChildValue} />
      <div className="w-full bg-green-500">
        <div className="w-full flex flex-col sm:flex-row justify-center items-center">
          <form className="w-full sm:-mt-60 flex flex-col justify-center items-center border-t-2 border-black sm:border-t-0 sm:border-r-2">
            <div className="sm:border-none sm:border-r-2 sm:border-black">
              <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl">Write your own story</h1>
                <BsPen className="ml-3 mt-4 sm:hidden" onClick={showContent} />
              </div>
              {content && (
                <div className="border-b-2 w-full flex justify-center items-center flex-col h-auto">
                  <div className="w-full border-black sm:border-none">
                    <label htmlFor="subject">
                      <h3 className="text-2xl mt-5">Topic</h3>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2"
                      type="text"
                      placeholder="write the topic for your story "
                      value={subject}
                      onChange={(e) => handleValue(e)}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="describe">
                      <h3 className="text-2xl mt-5">Description</h3>
                    </label>
                    <textarea
                      value={describe}
                      name="description"
                      className="w-full px-3"
                      id="describe"
                      placeholder="write what your story is about here"
                      onChange={(e) => handleValue(e)}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <div className="w-full bg-white py-2">
                      <div className="flex " onClick={handleShow}>
                        {selectedCategory ? (
                          <span className="px-3">
                            {selectedCategory.toUpperCase()}
                          </span>
                        ) : (
                          <span className="px-3 font-medium">
                            Select a category
                          </span>
                        )}
                        <BiChevronDown className="ml-48 mt-1 text-2xl" />
                      </div>
                    </div>

                    {show && (
                      <div className="w-full">
                        <div className="w-full flex items-center">
                          <AiOutlineSearch className="absolute mt-3 px-1 text-3xl" />
                          <input
                            type="text"
                            id="category"
                            className="w-full bg-white mt-3 px-8 py-2"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearch}
                            required
                          />
                        </div>

                        {searchText.length === 0 ? (
                          <ul className="w-full bg-white mt-1 h-auto px-3 py-2">
                            {initialCategories.map((category) => (
                              <li
                                className="hover:bg-slate-300 rounded-lg cursor-pointer px-2 py-1"
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        ) : searchResults.length > 0 ? (
                          <ul className="search-list">
                            {searchResults.map((category) => (
                              <li
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="w-full mt-2">
                            <ul className="w-40 ml">
                              <li
                                className="bg-white px-2 rounded-lg mb-3"
                                onClick={handleAdd}
                              >
                                Add new category
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="w-full flex justify-center items-center">
                      <button
                        type="submit"
                        className="w-[214px] h-[50px] self-center font-lato font-semibold bg-[#6B5023] my-2 text-[#FFFEFB]"
                        onClick={handleSubmit}
                      >
                        PUBLISH YOUR STORY
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="w-full flex sm:mt-12 mt-10 mb-10 bg-yellow-400">
            <section className="w-full flex mx-12 justify-center items-center">
              <div className="w-full flex">
                <div className="w-full bg-pink-400">
                  <h1 className="w-full text-2xl sm:text-3xl">
                    Read their stories
                  </h1>
                  <div className="w-full mt-2 h-screen">
                    <div className="flex flex-col">
                      <label htmlFor="choose">
                        <h3>What are you looking for?</h3>
                      </label>
                      <input
                        type="text"
                        id="choose"
                        className="px-3 py-2"
                        placeholder="Browse a Category"
                        value={search}
                        onClick={handleClick}
                        onChange={handleSearch2}
                        required
                      />
                      <BiChevronDown
                        className="absolute ml-44 text-2xl mt-8"
                        onClick={handleClick2}
                      />
                    </div>

                    {show4 ? (
                      <ul className="bg-white mt-1 w-full">
                        {initialCategories.map((category) => (
                          <li
                            className="hover:bg-slate-300 rounded-lg cursor-pointer px-3 py-1"
                            key={category}
                            onClick={() => handleCategorySelect2(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : show3 && search.length === 0 ? (
                      <ul className="search-list search-list-2">
                        {initialCategories.map((category) => (
                          <li
                            key={category}
                            onClick={() => handleCategorySelect2(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      show3 &&
                      searchResults2.length > 0 && (
                        <ul className="search-list search-list-2">
                          {searchResults2.map((category) => (
                            <li
                              key={category}
                              onClick={() => handleCategorySelect2(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-red-400 -ml-40 -mt-10 w-full ">
                <h1 className="">
                  <span>
                    {stories === 1
                      ? `${stories} story`
                      : stories === 0
                      ? `0 story`
                      : `${stories} stories`}
                  </span>{" "}
                  for you to read
                </h1>
                <div className="w-80 flex flex-row absolute -mt-80 ml-8 bg-red-300">
                  <h2 className="w-full py-1">
                    Sort:
                    <span onClick={handleflip}>
                      {flipped ? `Newest to Oldest` : `Oldest to Newest`}
                    </span>
                  </h2>
                  <CgArrowsExchangeAltV
                    className="text-4xl -ml-10"
                    onClick={handleflip}
                  />
                </div>
              </div>

              {windowWidth > 425 ? (
                <div className="mr-16">
                  {selectedValue && (
                    <div className="container">
                      <section className="item-section-main">
                        <div className="item-section-container">
                          {check && mappable && sorted(mappable)}
                        </div>
                      </section>
                    </div>
                  )}

                  {(!menu || search.length === 0) && (
                    <div className="container">
                      <section className="item-section-main">
                        <div className="item-section-container">
                          {check && mappable && sorted(mappable)}
                        </div>
                      </section>
                    </div>
                  )}

                  {search.length > 0 && menu && (
                    <div className="container">
                      <section className="item-section-main">
                        <div className="item-section-container">
                          {sorted(mappable)}
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              ) : (
                <div className="container">
                  <section className="item-section-main">
                    <Swiper
                      effect="coverflow"
                      // grabCursor='true'
                      centeredSlides="true"
                      slidesPerView={3}
                      coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      // onSwiper={handleSwiperInit}
                      // onSlideChange={handleSlideChange}
                    >
                      <div className="swiper-wrapper">
                        {(() => {
                          const sortedMappable = mappable.sort((a, b) => {
                            const dateA = new Date(
                              formattedDate2(Object.values(a[1])[4])
                            );
                            const dateB = new Date(
                              formattedDate2(Object.values(b[1])[4])
                            );

                            if (dateA < dateB) {
                              return flipped ? 1 : -1;
                            }

                            if (dateA > dateB) {
                              return flipped ? -1 : 1;
                            }

                            const timeA = formattedTime(Object.values(a[1])[4]);
                            const timeB = formattedTime(Object.values(b[1])[4]);

                            if (timeA < timeB) {
                              return flipped ? 1 : -1;
                            }
                            if (timeA > timeB) {
                              return flipped ? -1 : 1;
                            }
                          });

                          return sortedMappable.map((items, index) => {
                            const random = Math.random() * 4;
                            return (
                              <SwiperSlide
                                key={random}
                                className="swiper-slide"
                              >
                                {paragraph(Object.values(items[1]))}
                              </SwiperSlide>
                            );
                          });
                        })()}
                      </div>
                    </Swiper>
                  </section>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
