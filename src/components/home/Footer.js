import DownloadIcon from "@mui/icons-material/Download";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import HomeIcon from "@mui/icons-material/Home";
const Footer = () => {
  return (
    <footer className="footer-menu">
      <DownloadIcon sx={{ color: "gray" }} />
      <SlideshowIcon sx={{ color: "gray" }} />

      <HomeIcon sx={{ color: "gray" }} />
    </footer>
  );
};

export default Footer;
