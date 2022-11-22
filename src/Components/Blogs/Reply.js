import { useState, useRef } from "react";
import { Grid } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

import UserBlogDescription from "./userBlogDescription/userBlogDescription";
import Snacker from "../Snacker/Snaker";
import Spinner from "../Spinner/BlogSpinner";
import classes from "./blogs.module.css";
import HelperIcons from "./HelperIcons";
import WriterModal from "./WriterModal";
import axios from "../../Axios/axios";
import SaveCancel from "./SaveCancel";

const Reply = (props) => {
  const reply = props.replyData;
  const [editReply, setEditReply] = useState(false);
  const [initialReply, setInitialReply] = useState(reply.Body);
  const [deleted, setDeleted] = useState(false);
  const [showWriter, setShowWriter] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(null);

  const divRef = useRef();

  function resizeImageForMarkdown(props) {
    return (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img {...props} style={{ maxWidth: "80%" }} />
      </div>
    );
  }

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this comment")) {
      setSpinner(true);
      try {
        await axios.delete("/reply/deleteReply/" + reply._id);
        setDeleted(true);
      } catch (e) {
        setError("Oops something went wrong try again later!");
      }
      setSpinner(false);
    }
  };

  const saveHandler = async () => {
    const data = divRef.current.value.trim();
    if (!data || !data.trim()) {
      return setError("Reply can't be empty");
    }
    setSpinner(true);
    try {
      const res = await axios.patch("/reply/updateReply/" + reply._id, {
        Body: data,
      });
      setEditReply(false);
      setInitialReply(res.data.Body);
    } catch (e) {
      setError("Oops something went wrong try again later!");
    }
    setSpinner(false);
  };

  if (spinner) {
    return (
      <div style={{ display: "flex", alignSelf: "center" }}>
        <Spinner />
      </div>
    );
  }

  if (deleted) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          width: "60vw",
          margin: "15px 0px 10px 0px",
          background: "#fff",
          borderRadius: "30px",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", background: "#fff" }}>
            <UserBlogDescription
              admin={{ User: reply.User }}
              date={reply.createdAt}
            />
          </div>
          {editReply === false ? (
            <div
              style={{
                background: "#fff",
                fontSize: "18px",
                padding: "15px",
                boxSizing: "border-box",
                overflow: "auto",
              }}
            >
              <ReactMarkdown
                renderers={{ image: resizeImageForMarkdown }}
                children={initialReply}
              />
            </div>
          ) : (
            <div style={{ margin: "2px" }}>
              <textarea
                ref={divRef}
                style={{
                  width: "100%",
                  minHeight: "150px",
                  resize: "vertical",
                  fontSize: "18px",
                  padding: "5px",
                  boxSizing: "border-box",
                }}
                placeHolder="Write your reply (Markdown is supported)"
              >
                {initialReply}
              </textarea>
            </div>
          )}
          <Grid
            style={{ display: "flex", marginTop: "0px", background: "#fff" }}
          >
            <Grid container direction="row" justify="flex-start">
              {editReply ? (
                <SaveCancel
                  type="reply"
                  saveHandler={saveHandler}
                  cancelHandler={() => setEditReply(false)}
                />
              ) : null}
            </Grid>

            <Grid className={classes.helperGrid_reply}>
              <HelperIcons
                type="reply"
                admin={{ User: reply.User }}
                showEditBtn={!editReply}
                editHandler={() => setEditReply(true)}
                deleteHandler={deleteHandler}
                openWriter={() => setShowWriter(true)}
                likeRoute={"/reply/like/" + reply._id}
                likeArray={reply.Likes}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ width: "55vw", alignSelf: "center", backgorund: "red" }}>
        {showWriter ? (
          <WriterModal
            Api="/reply/newReply/"
            parentId={reply.Comment}
            fetchData={props.fetchRepliesAgain}
            cancelHandler={() => setShowWriter(false)}
          />
        ) : null}
        <Snacker
          open={error !== null}
          severity="error"
          timer={6000}
          message={error}
          onClose={() => setError(null)}
        />
      </div>
    </>
  );
};

export default Reply;
