// api from here you tube data api v3 https://console.cloud.google.com/apis/library?project=circular-beacon-274709

// The URL for the YouTube Data API tat. Youtube Data Api URL for youtube search
const baseURL = "https://www.googleapis.com/youtube/v3/search";

// Api Key for youtube data api
const key = "AIzaSyCAQ1cXpN2I8KbgBKtRJhzON5ThDeQEQuI";

let url;

// Grabing references to all the DOM elements that need to manipulate
const searchTerm = document.querySelector("#search");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector("#search-btn");
const section = document.querySelector("#results");

// Adding a submit event listener for the search form, referencing the fetchResults function as the callback
searchForm.addEventListener("submit", fetchResults);

// Function
function fetchResults(event) {
  // using this to prevent the form from submitting
  event.preventDefault();

  //   Assemble the full URL, according to the API documentation at Google. ( I got it from here https://developers.google.com/youtube/v3/docs/search/list )
  url = `${baseURL}?part=snippet&key=${key}&q=${searchTerm.value}&type=video`;

  // Use fetch() to pass the URL that we built as a request to the API service, then pass the JSON to the displayResults() function
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayResults(json))
    .catch((error) => console.error("Error fetching data:" + error.message));
}

function displayResults(json) {
  //Log to the console the results from the API
  // Clear out the old results…
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  // Create the variable videos to capture the videos from the JSON object
  let videos = json.items;

  if (videos.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results returned. Try something else!!";
    section.appendChild(para);
  } else {
    for (let i = 0; i < videos.length; i++) {

        // Setting variable name to  new elements that is used to display the search results 
      const video = document.createElement("article");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const image = document.createElement("img");
      const para1 = document.createElement("p");
        // current for the current video that we are iterating over 
      const current = videos[i];
      console.log(current);
      //Look at the console output from the API… most of these i watched our nytimes to get an idea as it was very complex for me.
      link.href = "https://www.youtube.com/watch?v=" + current.id.videoId;
      link.textContent = current.snippet.title;
      para1.textContent = current.snippet.description;

      if (current.snippet.thumbnails.medium.url) {
        image.src = current.snippet.thumbnails.medium.url;
        image.alt = current.snippet.title;
      }
      //Putting each video together as an article element and append it as a child of the sectino element.
      section.appendChild(video);
      video.appendChild(heading);
      heading.appendChild(link);
      video.appendChild(image);
      video.appendChild(para1);
    }
  }
}
