import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';
import InputBox from "./components/InputBox"
import ScrollButton from "./components/ScrollButton";
// import GradientBG from "./components/GradientBG"
// import Autocomplete from "./components/Autocomplete";
// // import searchItems from './db.json';
// // import userInput from './components/Autocomplete'


function App() {

const [data, setData] = useState([]);
const [query, setQuery] = useState("landscapes");
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
  // if (e.keyCode === 13) {
    setQuery((e.target.value?e.target.value:"landscapes"));
    setData([]);
  // }
};



// const onKeyDown1=(()=> {
//   const inputvalue=document.getElementById('userInput').value
//   searchImages(inputvalue)
// })

const[suggestions,setSuggestions]=useState([])
const fetchSuggestions=async()=>{
  const res = await fetch('https://polar-badlands-57668.herokuapp.com/searchTerms')
  const data = await res.json()
  console.log(data)
  return data
}

useEffect(()=>{
  const getSuggestions=async()=>{
    const suggestionsFromServer=await fetchSuggestions()
    setSuggestions(suggestionsFromServer)
  }

   getSuggestions()
 },[])
// let suggestions=[];
// const res=fetch('https://polar-badlands-57668.herokuapp.com/searchTerms')
// suggestions=res.json;

// const res = JSON.parse(searchItems)
// const res = await fetch('https://polar-badlands-57668.herokuapp.com/tasks')
  return (
    
    <div className="test">
    <div className="App flex">
      
      
    {/* <As */}
    {/* {(searchItems)=>searchImages(searchItems)} */}
    <InputBox
    type="text"
    // onKeyDown={(e) => searchImages(e)}
    // placeholder="Search For Images"
    searchItems={searchImages}
    suggestions={suggestions}
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
    <ScrollButton />
  </div>
  </div>
  );
}

export default App;
