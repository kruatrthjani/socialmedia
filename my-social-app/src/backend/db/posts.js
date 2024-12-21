import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "xhzTkUi2Nt",
    content: "Nice Weather Today!!",
    mediaURL: "https://www.weathercompany.com/wp-content/uploads/2024/01/hero-hurricane-storm-weather-shutterstock_1603937461.jpg",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "okzxcf",
        username: "janedoe",
        text: "I agree!! Feels like we should go for outing. What say?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "romabulani",
    createdAt: "2022-01-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "siFFxfYI1s",
    content: "Started my Baking journey! Look what I made.",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/video/upload/v1652188886/upload-socialmedia/oikev6eomsgahnvxcijd.mp4",
    likes: {
      likeCount: 0,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-05-21T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "3XHvLP1fg",
    content: "I made this cake for my friend's birthday. Check it out",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652188492/upload-socialmedia/cakegif_q11mfm.webp",
    likes: {
      likeCount: 1,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6nImWvImxo",
        username: "johndoe",
        text: "That's mouth watering! Could you make one for my Birthday as well?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "janedoe",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "MTYtVhecCj",
    content:
      "You are never too old to set another goal or to dream a new dream.",
    mediaURL: "data:image/jpeg;base64,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",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarshbalika",
    createdAt: "2022-03-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "3XHvLP9kC",
    content: "Yayy! Its my Birthday Today. Made this cake for myself!",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014336/ecommerce/chocolatecake4.webp",
    likes: {
      likeCount: 2,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "EO7iOPN9n8",
        username: "carlsmith",
        text: "Happy Birthday! Enjoy your Day!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: "QK52wf6HI1",
        username: "janedoe",
        text: "Wow! Looks Amazzing! Happy Birthday!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "adarshbalika",
    createdAt: "2022-03-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "tHaThLyFQh",
    content:
      "Life has got all those twists and turns. You’ve got to hold on tight and off you go.",
    mediaURL: "https://upload.wikimedia.org/wikipedia/commons/4/47/Cordage_en_chanvre.jpg",
    likes: {
      likeCount: 2,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarshbalika",
    createdAt: "2022-04-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "G-Gi3lSZP9",
    content: "When you have a dream, you’ve got to grab it and never let go.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarshbalika",
    createdAt: "2022-05-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "GeMUAdi9mh",
    content:
      "No matter what people tell you, words and ideas can change the world.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "adarshbalika",
    createdAt: "2022-03-06T12:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "IyUlYXTrzZ",
    content: "Who's up for Pineapple Pastry?",
    mediaURL:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1647014828/ecommerce/pineapplemuffin1.webp",
    likes: {
      likeCount: 10,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6nIffvImxo",
        username: "sophiajones",
        text: "Oh! That looks Delicious!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "romabulani",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "Ie92xOSVeU",
    content:
      "Check out this amazing video from BakinZone https://bakinzone.netlify.app/videos/qtlhdIfojmc",
    mediaURL: "",
    likes: {
      likeCount: 1,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "6fgd534s",
        username: "janedoe",
        text: "Yes! I am also learning from there!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "alexmaxwell",
    createdAt: "2022-04-12T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "xhzTkUyfNt",
    content: "Believe in yourself! Rest all will fall in place.",
    mediaURL: "",
    likes: {
      likeCount: 2,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "unImWvIzbf",
        username: "romabulani",
        text: "So True!!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "sophiajones",
    createdAt: "2022-05-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "CCmJpDnnQQ",
    content:
      "You can get everything in life you want if you will just help enough other people get what they want.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "Z_TZT_3EAw",
    content:
      "If you believe something needs to exist, if it's something you want to use yourself, don't let anyone ever stop you from doing it.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "johndoe",
    createdAt: "2022-01-12T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "e-knMEsoLq",
    content: "More is lost by indecision than wrong decision.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "alexmaxwell",
    createdAt: "2022-01-26T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "VY14RsXC7G",
    content:
      "The reason we struggle with insecurity is because we compare our behind-the-scenes with everyone else’s highlight reel.",
    mediaURL: "",
    likes: {
      likeCount: 7,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-03-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "l9pedEMjZS",
    content: "If you don’t risk anything, you risk even more.",
    mediaURL: "",
    likes: {
      likeCount: 6,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sophiajones",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "lbW4dlCpNC",
    content: "If it makes you nervous, you’re doing it right.",
    mediaURL: "",
    likes: {
      likeCount: 12,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-04-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "k-Vwd2d7Vt",
    content:
      "I learned a long time ago that there is something worse than missing the goal, and that’s not pulling the trigger.",
    mediaURL: "",
    likes: {
      likeCount: 9,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "carlsmith",
    createdAt: "2022-01-14T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "R2lAuXvK7V",
    content:
      "Success is stumbling from failure to failure with no loss of enthusiasm. Love this quote by Winston Churchill.",
    mediaURL: "",
    likes: {
      likeCount: 12,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "janedoe",
    createdAt: "2022-05-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "G5xd30tMCR",
    content:
      "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "alexmaxwell",
    createdAt: "2022-02-14T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "lF8cnfPAe9",
    content:
      "Life is like riding a bicycle. To keep your balance you must keep moving.",
    mediaURL: "",
    likes: {
      likeCount: 5,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "romabulani",
    createdAt: "2022-01-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "stfTkUi2Nt",
    content:
      "“Do not wait for the perfect time and place to enter, for you are already onstage.",
    mediaURL: "",
    likes: {
      likeCount: 25,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sophiajones",
    createdAt: "2022-05-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "quiTkUi2Nt",
    content: "It is a rough road that leads to the heights of greatness.",
    mediaURL: "",
    likes: {
      likeCount: 8,
      
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "janedoe",
    createdAt: "2022-02-10T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];

