import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { Link } from "react-router-dom";
import style from "../../style";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PowerIcon,
  HomeModernIcon,
  HomeIcon,
  UsersIcon,
  PhotoIcon,
  VideoCameraIcon,
  FilmIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithBurgerMenu() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const handleLogout = () => {
    // Clear localStorage and redirect to signin page
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/signin");
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="fixed top-0 right-0 mt-8 mr-8">
        <IconButton
          variant="text"
          className={`${style.colors.navbarhighlighttext}`}
          size="lg"
          onClick={openDrawer}
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
      </div>
      <Drawer
        className={`${style.colors.navbarbg}`}
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img src={logo} alt="brand" className="h-16 w-16" />
            <Typography variant="h5" color="blue-gray">
              Dashboard
            </Typography>
          </div>
          {/* <div className="p-2">
            <Input
              icon={
                <MagnifyingGlassIcon className="h-5 w-5 text-amber-300 hover:text-amber-400" />
              }
              label="Search"
              color="amber"
            />
          </div> */}

          <hr className="my-2 border-white" />
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            ></Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            ></Accordion>
            <Link to="/Home">
              <ListItem className={`hover:${style.colors.navbarhighlight}`}>
                <ListItemPrefix>
                  <HomeIcon className="h-5 w-5" />
                </ListItemPrefix>
                Home page
              </ListItem>
            </Link>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <UsersIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/UserManagement"> UserManagement</Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/heromanagement"> heromanagement</Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <VideoCameraIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/LiveDarshanManagement">
                LiveDarshanManagement
              </Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <FilmIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/VideoManagement"> VideoManagement</Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <CalendarDaysIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/EventManagement"> EventManagement</Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <PhotoIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/GalleryManagement"> GalleryManagement</Link>
            </ListItem>
            <ListItem className={`hover:${style.colors.navbarhighlight}`}>
              <ListItemPrefix>
                <PhotoIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="dashboard/TrustedImagesManagement">
                {" "}
                TrustedImagesManagement
              </Link>
            </ListItem>
            <ListItem
              onClick={handleLogout}
              className={`hover:${style.colors.navbarhighlight}`}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}

export default SidebarWithBurgerMenu;
