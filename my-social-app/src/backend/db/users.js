import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "t7cZfWIp-q",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Be yourself!",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp",
    website: "https://romabulani.netlify.app/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },
  {
    _id: "79Gksh9otl",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp",
    website: "https://google.com/",
    createdAt: "2022-01-02T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },
  {
    _id: "1T6Be1QpLm",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    password: "janedoe123",
    bio: "Whats in bio?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp",
    website: "https://romabulani.netlify.app/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },
  {
    _id: "LCrc9f0Zl0",
    firstName: "Carl",
    lastName: "Smith",
    username: "carlsmith",
    password: "carlsmith123",
    bio: "Whats in bio?",
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651563581/socialmedia/avatars/carl-smith_mehw0u.webp",
    website: "https://romabulani.netlify.app/",
    createdAt: "2022-01-03T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },

  {
    _id: "o5gzWjEeX_",
    firstName: "Roma",
    lastName: "Bulani",
    username: "romabulani",
    password: "romabulani123",
    bio: "Aspiring Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652525370/socialmedia/avatars/roma.webp",
    website: "https://romabulani.hashnode.dev/",
    createdAt: "2022-01-04T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },

  {
    _id: "M1NR81Bzlz",
    firstName: "Alex",
    lastName: "Maxwell",
    username: "alexmaxwell",
    password: "alexmaxwell123",
    bio: "What's up?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652525373/socialmedia/avatars/alex-maxwell.webp",
    website: "",
    createdAt: "2022-01-05T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },

  {
    _id: "qq8zWjEeXd",
    firstName: "Sophia",
    lastName: "Jones",
    username: "sophiajones",
    password: "sophiajones123",
    bio: "Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652525510/socialmedia/avatars/sophia-jones.webp",
    website: "",
    createdAt: "2022-01-06T10:55:06+05:30",
    updatedAt: formatDate(),
    followers:[],
    following:[],
  },
];
