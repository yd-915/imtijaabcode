import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Spinner from "../Spinner/BlogSpinner";
import HelperIcons from "./HelperIcons";
import axios from "../../Axios/axios";
import Snacker from "../Snacker/Snaker";

export default function SingleBlog(props) {
  const blog = props.blog;
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const onClickHandler = () => {
    return history.push("/blog/" + blog._id);
  };

  function resizeImageForMarkdown(props) {
    return (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img {...props} style={{ maxWidth: "80%" }} />
      </div>
    );
  }

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this Blog")) {
      setSpinner(true);
      try {
        await axios.delete("/blogs/delete/" + blog._id);
        setDeleted(true);
      } catch (e) {
        setError("Oops something went wrong try again later");
      }
      setSpinner(false);
    }
  };

  if (spinner) {
    return <Spinner />;
  }

  if (deleted) {
    return <></>;
  }

  return (
    <div
      style={{
        border: "10px double #fff",
        padding: "10px",
        marginTop: "20px",
        width: "80vw",
        maxWidth: "800px",
        borderRadius: "20px",
      }}
    >
      <Grid
        key={blog._id}
        style={{
          padding: "1vh",
          minHeight: "16vh",
          width: "98%",
          background: "#fff",
          borderRadius: "20px",
        }}
      >
        <UserBlogDescription
          admin={{ User: blog.User }}
          date={blog.createdAt}
        />
        <Grid
          style={{ marginTop: "1vh", cursor: "pointer" }}
          onClick={onClickHandler}
        >
          <Typography>
            <ReactMarkdown
              renderers={{ image: resizeImageForMarkdown }}
              children={blog.Body}
            />
          </Typography>
        </Grid>
        <Grid container direction="row" justify="flex-end">
          <HelperIcons
            type="blog"
            allBlogPage={true}
            admin={{ User: blog.User }}
            deleteHandler={deleteHandler}
            toggleCommentHandler={onClickHandler}
            commentsLength={blog.Comments.length}
            likeRoute={"/blogs/like/" + blog._id}
            likeArray={blog.Likes}
          />
        </Grid>
      </Grid>
      <Snacker
        open={error !== null}
        severity="error"
        timer={6000}
        message={error}
        onClose={() => setError(null)}
      />
    </div>
  );
}
