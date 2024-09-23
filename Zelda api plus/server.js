const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

var Games = {
  "data": [{
        "name": "The Legend of Zelda: Tears of the Kingdom",
        "description": "The announcement of Tears of the Kingdom under the name Breath of the Wild 2 which Nintendo Called at the time The Sequel to Breath of the Wild was celebrated by fans across the world as Breath of the Wild was one of the most popular games on the Nintendo Switch and was known throughout the gaming community, especially after winning the Game of the Year award at the 2017 Japan Game Awards. Many fans speculated about whether Princess Zelda would be a playable character or if multiplayer would be added, but when asked, Aonuma declined to answer.",
        "developer": "Nintendo EPD",
        "publisher": "Nintendo",
        "released_date": "May 12, 2023",
        "box_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/9f/The_Legend_of_Zelda_TOTK_%28NA_cover_art%29.png",
        "game_title_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4c/TotK_English_Logo.png",
        "id": "g3fo2jfo5khnvs93iff2v6"
    },
    {
      "name": "The Legend of Zelda: Link's Awakening (Nintendo Switch)",
      "description": "Eiji Aonuma decided to remake Link's Awakening as he considers the original game hard to get many years after its release. The miniature diorama-like art style was chosen as the original game had a tilt-shift perspective,[6] which is commonly used in miniature faking.",
      "developer": "Grezzo",
      "publisher": "Nintendo",
      "released_date": "September 20, 2019",
      "box_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/55/LANS_NA_Box_Art.png",
      "game_title_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/70/LANS_English_Logo_2.png",
      "id": "ho29g0vjs0e20gj10vbq"
  },
  {
    "name": "The Legend of Zelda: Majora's Mask 3D",
    "description": "Eiji Aonuma, producer of The Legend of Zelda series, had previously discussed if Majora's Mask should be remade for the Nintendo 3DS, taking into consideration the positive reception of Ocarina of Time 3D. Fans in response had created a campaign named Operation Moonfall aiming to convince Nintendo to create the 3D remake. On November 4, 2011, he announced that the remake is already in consideration. On October 11, 2013, he hinted at the possibility of a 3DS remake at the New York Comic Con, stating that fans may get an answer as to whether one will be released by playing A Link Between Worlds. On November 5, 2014, Nintendo confirmed via their Nintendo Direct that Majora's Mask 3D would be scheduled for a spring 2015 release.",
    "developer": "Grezzo",
    "publisher": "Nintendo",
    "released_date": "February 13, 2015",
    "box_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/a5/MM3D_NA_Box_Art.png",
    "game_title_img": "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c5/MM3D_English_Logo.png",
    "id": "ovh10jv1fob2v71pva11"
},
    
  ]
}

// Define a route to handle incoming requests
app.get('/games', (req, res) => {
  res.json(Games)
});

app.get('/games/:id', (req, res) => {
  const id = req.params.id;
  const item = Games.data.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
});