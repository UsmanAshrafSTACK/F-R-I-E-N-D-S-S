import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import { doc, onSnapshot } from "firebase/firestore";
import { app, db, auth, storage } from "./FirebaseConfig";
import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  createContext,
} from "react";
// import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "@firebase/storage";
import ColorButtons from "./ColorButtons";
import Stack from "@mui/material/Stack";
import { height } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import { collection, setDoc, query, where } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import TextField from "@mui/material/TextField";
import Caption from "./Caption";
import Card from "@mui/material/Card";
import CardHeader from "./CardHeader";
import CardMain from "./CardMain";
import CardFooter from "./CardFooter";
import { updateDoc } from "firebase/firestore";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import { updateEmail } from "firebase/auth";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import UserInformation from "./UserInformation";
import PostForm from "./PostForm";
import Nouman from "./Nouman";
import {
  gettingUserInfo,
  getAllUsers,
  searchResult,
  updateProvidedData,
  showUser,
  Input,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  drawerWidth,
  openedMixin,
  closedMixin,
  DrawerHeader,
  AppBar,
  Drawer,
  handleDrawerOpen,
  handleDrawerClose,
} from "./Functions";
import PostNav from "./PostsNav";
import SuggestUsers from "./SuggestUsers";

const User = createContext();

export default function MiniDrawer() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  //// From Material UI
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //// From Material UI

  const theme = useTheme();

  // const [post, setPost] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();
  const { userPOP, userDataReducer } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    gettingUserInfo(setUserInfo);
  }, []);

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);

  const [uid, setUID] = useState("");
  const [mainPage, setMainPage] = useState(true);
  const [friendsDiv, setFriendsDiv] = useState(false);
  const [userDiv, setUserDiv] = useState(false);
  const [postDiv, setPostDiv] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const upFile = useRef("");
  const [inputSearch, setInputSearch] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);

  return (
    <User.Provider value={userInfo}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              F R I E N D S
            </Typography>
            <Avatar
              alt="Trevor Henderson"
              style={{ left: "80%", height: "50px", width: "50px" }}
              src={userInfo.userPhoto}
              onClick={userPOP}
            />
            <Stack spacing={2} sx={{ width: 300 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={inputSearch}
                  onChange={(e) => {
                    setInputSearch(e.target.value);
                    console.log(e.target.value);
                    setSearchedResult([]);
                    // searchResult(inputSearch, setSearchedResult, searchedResult);
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <button
                onClick={() => {
                  setSearchedResult([]);
                  searchResult(inputSearch, setSearchedResult, searchedResult);
                }}
              >
                Show Result
              </button>

              <div className="Results">
                {searchedResult.map((e, index) => {
                  return (
                    <SuggestUsers
                      // onClick={() => {
                      //   showUser(e.userID, navigate);
                      //   setSearchedResult([]);
                      // }}
                      show={() => {
                        showUser(e.userID, navigate);
                      }}
                      set={() => {
                        setSearchedResult([]);
                      }}

                      key={index}
                      src={e.userPhoto}
                      name={e.firstName + " " + e.lastName}
                    />
                  );
                })}
              </div>
            </Stack>
            <Avatar
              alt="Trevor Henderson"
              style={{ left: "80%" }}
              src={userInfo.userPhoto}
              onClick={userPOP}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["News Feed"].map((text, index) => (
              <ListItem
                key={index}
                button
                key={text}
                onClick={() => {
                  if (!postDiv) {
                    navigate("/post");
                  }
                }}
              >
                <ListItemIcon>
                  <Link to="/" className="link">
                    {<HomeIcon />}
                  </Link>
                </ListItemIcon>
                <Link to="/" className="link">
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
            <PostNav />

            {["Find Friends"].map((text, index) => (
              <ListItem
                key={index}
                button
                key={text}
                onClick={() => {
                  navigate("/users");
                }}
              >
                <ListItemIcon>
                  <Link to="/" className="link">
                    {<GroupAddIcon />}
                  </Link>
                </ListItemIcon>
                <Link to="/" className="link">
                  <ListItemText primary={text} />
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <UserInformation />
          <PostForm />
        </Box>
      </Box>
    </User.Provider>
  );
}

export { User };
