import { Container } from "@material-ui/core";
import Stars from "../Components/Stars/Stars";
import Nav from "../Components/Nav/Nav";
import Back from "../Components/Back/Back";
import Title from "../Assets/images/logo.png";
import Github from "../Assets/images/Github.png";
import Admin from "../Components/About/Admin/Admin";
import AboutContent from "../Components/About/AboutContent";
import classes from "./pages.module.css";
import HomeIcon from "../Components/Home/Home"

export default function About(props) {

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "20px",
        background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      }}
    >
      <Stars />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", position: "sticky"}}>
          <Back />
          <HomeIcon />
        </div>
        <Nav />
      </div>
      <Container component="main" maxWidth="md" style={{ marginTop: "5px" }}>
        <div className={classes.contain}>
          <div className={classes.paper_about}>
            <img
              src={Title}
              style={{
                height: "40%",
                width: "50%",
                minWidth: "205px",
                alignSelf: "center",
              }}
              alt="Code-N-Collab"
            />
            <div className={classes.About}>
              Source Code
              <a
                title= "IftiinCode Repo"
                href="https://github.com/yd-915/collab"
                target="_blank"
                rel="noreferrer"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={Github}
                  alt="Github"
                  style={{
                    width: "20%",
                    height: "10%",
                    minWidth: "50px",
                    margin: "-10px 0 0 10%",
                  }}
                />
              </a>
            </div>
            <AboutContent />
            <div
              style={{
                width: "100%",
                borderRadius: "20px",
                background:
                  "radial-gradient(ellipse, #FF3333 0%, #3383FF 100%)",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  margin: "10px",
                  padding: "5px",
                  fontSize: "25px",
                  fontWeight: "bold",
                  border: "2px solid gray",
                  fontFamily: ["Fira Sans", "sans-serif"].join(),
                }}
              >
                Brought to you by :
              </div>

              <div className={classes.AdminContainer}>
                <div className={classes.admin_div}>
                  <Admin
                  
                    
                    
                   
                    
                  />
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
