import Athar from "../../../Assets/images/athar.jpg";
import Adnan from "../../../Assets/images/Adnan.jpg";
import Linkedin from "../../../Assets/images/Linkedin.png";
import Codeforces from "../../../Assets/images/Codeforces.png";
import AtharPortfolio from "../../../Assets/images/AtharPortfolio.jpg";
import Iftiin from "../../../Assets/images/ifstar.png";
import classes from "./admin.module.css";

export default function Admin(props) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
       
        <p className={classes.name}>{props.Name}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: "1vw",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
       
        <a
          title="Main"
          href={props.main}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "100%", display:"block", marginLeft: "50%", marginRight:"50%" }} src={Iftiin} alt="Github" />
        </a>
        
        <a
          title="Main"
          href={props.main}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "100%", display:"block", marginLeft: "50%", marginRight:"50%" }} src={Iftiin} alt="Github" />
        </a>

        <a
          title="Main"
          href={props.main}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "100%", display:"block", marginLeft: "50%", marginRight:"50%" }} src={Iftiin} alt="Github" />
        </a>

        <a
          title="Main"
          href={props.main}
          className={classes.iconImg}
          rel="noreferrer"
          target="_blank"
        >
          <img style={{ width: "100%", display:"block", marginLeft: "50%", marginRight:"50%" }} src={Iftiin} alt="Github" />
        </a>

    
      </div>
    </>
  );
}
