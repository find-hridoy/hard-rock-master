//  Select DOM element
const searchArea = document.getElementById("search-area");
const searchBtn = document.getElementById("search-btn");
const songList = document.querySelector(".song-list");
const songLyrics = document.getElementById("song-lyrics");
const songTitleName = document.getElementById("song-title");
const anotherSongLIst = document.querySelector("another-song-list");

// Start EventListener
searchBtn.addEventListener("click", function () {
  fetch(` https://api.lyrics.ovh/suggest/${searchArea.value}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        const songTitle = element.title;
        const albumTitle = element.album.title;
        const albumCover = element.album.cover_medium;
        const albumArtist = element.artist.name;

        songList.innerHTML += `<div class="row single-result p-3 d-flex align-items-center mb-4">
                                                        <div class="col-md-2">
                                                          <img
                                                            class="rounded-circle"
                                                            width="100"
                                                            height="100"
                                                            src="${albumCover}"
                                                            alt=""
                                                          />
                                                        </div>
                                                        <div class="col-md-7">
                                                          <h3 class="lyrics-name mt-3 text-warning">${songTitle}</h3>
                                                          <p class="author lead mt-4">
                                                            Album by
                                                            <span class="text-danger"><strong>${albumTitle}</strong></span>
                                                          </p>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <div class="text-md-right text-center">
                                                            <button onclick="getSongLyrics('${albumArtist}', '${albumTitle}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
                                                          </div>
                                                        </div>
                                                      </div>`;
      }
    });
});

// Lyrics Function
function getSongLyrics(albumArtist, albumTitle, songTitle) {
  console.log(albumArtist, albumTitle);
  fetch(`https://api.lyrics.ovh/v1/${albumArtist}/${albumTitle}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { lyrics, error } = data;

      if (lyrics) {
        songLyrics.innerHTML = lyrics;
      }
      if (error) {
        songLyrics.innerHTML = "Oops! sorry, " + error;
      }
      songTitleName.innerHTML = songTitle;
    });
}
