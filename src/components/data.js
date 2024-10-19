import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Users from "./Users/Users";
import Article from "./Article/Article";
import Navbar from "./Navbar/Navbar";
import Protected from "./Protected/Protected";
import NotFound from "./NotFound/NotFound"
import Profile from "./Profile/Profile";
import News from "./News/News";
import ArticleUsers from "./ArticleUsers/ArticleUsers";
import ProfileUsers from "./ProfileUsers/ProfileUsers"

export const mainLink = 'http://localhost:4000'

export const navbar = [
    {
        id: 1,
        name: "Users",
        link: "Users",
    },
    {
        id: 2,
        name: "Article",
        link: "Article",
    },
    {
        id: 3,
        name: "News",
        link: "News",
    }
];

export {
    Article,
    Home,
    Users,
    Login,
    Navbar,
    Register,
    Protected,
    NotFound,
    Profile,
    News,
    ArticleUsers,
    ProfileUsers,
} 