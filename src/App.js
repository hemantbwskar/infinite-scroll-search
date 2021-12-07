import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';
import Autocomplete from "./components/Autocomplete";
import searchItems from './db.json';


function App() {

const [data, setData] = useState([]);
const [query, setQuery] = useState("code");
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

const client_id = "8-AfSfwFTnK35yfuV6LM7OerBZXTwUBIdxhq3fzYLmA";
const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

const fetchImages = () => {
  axios
    .get(fetchUrl, {
      headers: {},
    })
    .then((response) => {
      setData([...data, ...response.data.results]);
    })
    .catch((error) => {
      console.log(error);
    });
  setPage(page + 1);
};

useEffect(() => {
  fetchImages();
}, [query]);

const searchImages = (e) => {
  if (e.keyCode === 13) {
    setQuery(e.target.value);
    setData([]);
  }
};
// const res = JSON.parse(searchItems)
// const res = await fetch('https://polar-badlands-57668.herokuapp.com/tasks')
  return (
    <div className="App flex">
      
    {/* <Autocomplete 
      type="text"
      onKeyDown={(e) => searchImages(e)}
      
      suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}
      
    /> */}
    <input
    type="text"
    onKeyDown={(e) => searchImages(e)}
    placeholder="Search For Images"
    />
    <InfiniteScroll
      dataLength={data.length}
      next={fetchImages}
      hasMore={hasMore}
      loader={<p>Loading more...</p>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen it all</b>
        </p>
      }
    >
      <div className="main flex">
        {data.map((data, key) => (
          <div className="container" key={key}>
            <img
              src={data.urls.small}
              className="image"
              alt={data.alt_description}
            />
            {/* <h4>Photo by {data.user.name} 📸</h4> */}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  </div>
  );
}

export default App;
