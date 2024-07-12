import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
interface INavbarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}
export default function NavBar({
  drawerWidth,
  handleDrawerToggle,
}: INavbarProps) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: { md: "none", xs: "block" },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Todo Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
