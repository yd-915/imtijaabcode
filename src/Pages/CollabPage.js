import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

import Snacker from "../Components/Snacker/Snaker";
import Chat from "../Components/Chat/ChatTabs";
import Editor from "../Components/Editor/Editor";
import IO from "../Components/IO/IO";
import Problem from "../Components/Problem/Problem";
import Toolbar from "../Components/Toolbar/Toolbar";
import Spinner from "../Components/Spinner/ContestSpinner/ContestSpinner";
import * as TYPES from "../store/Action/action";
import { useSnackbar } from 'notistack';
import "react-reflex/styles.css";

const CollabPage = (props) => {
  const socket = props.socket;
  const location = useLocation();
  const history = useHistory();
  const [joined, setJoined] = useState(false);
  const [startMsgSnackbar, setStartMsgSnackbar] = useState(true);
  const { enqueueSnackbar,closeSnackbar} = useSnackbar();
  const [resizeEditorNotify,setResizeEditorNotify] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (
      !searchParams.get("name") ||
      !searchParams.get("room") ||
      !location.state
    ) {
      let err = {};

      if (!searchParams.get("name") || !searchParams.get("room")) {
        err = {
          error: "Username or RoomName can't be empty",
        };
      }
      try {
        if (!searchParams.get("room").toLowerCase().endsWith("collab")) {
          err = {
            error: "Invalid room",
          };
        }
      } catch (e) {}

      return history.push({
        pathname: "/rooms",
        search:
          "?" +
          (searchParams.has("room") ? "room=" + searchParams.get("room") : ""),
        state: err,
      });
    }
    const password = location.state.password;

    socket.emit(
      "join",
      {
        room: searchParams.get("room"),
        username: searchParams.get("name"),
        password,
      },
      ({ error, user }) => {
        if (error) {
          return history.push({
            pathname: "/rooms",
            search:
              "?" +
              (searchParams.has("room")
                ? "room=" + searchParams.get("room")
                : ""),
            state: { error },
          });
        }
        setJoined(true);
      }
    );
  }, []);

  useEffect(()=>{
    if(props.output_success){
      enqueueSnackbar("Code Compiled Succesfully !", {
        variant:'success',
      });
      props.notify_output_off();
    }
  },[props.output_success])

  return joined ? (
    <>
      <Toolbar />
      <div style={{ height: "85vh", overflowY: "hidden" }}>
        <ReflexContainer orientation="vertical">
          <ReflexElement
            minSize="0"
            maxSize="900"
            size="400"
            style={{ overflowX: "hidden" }}
          >
            <Problem socket={socket} />
          </ReflexElement>

          <ReflexSplitter
            className="reflex-thin"
            style={{
              background: "#1f273d",
              opacity: "1",
              border: "0.3px",
            }}
          />

          <ReflexElement orientation="horizontol" maxSize="1900" minSize="400">
            <ReflexContainer>
              <ReflexElement
                minSize="100"
                maxSize="1600"
                style={{ display: "flex" }}
              >
                <Editor socket={socket} />
              </ReflexElement>
              <ReflexSplitter
                className="reflex-thin"
                style={{
                  backgroundColor: "#1f273d",
                  opacity: "1",
                  border: "0.3px",
                }}
              />
              <ReflexElement
                minSize="0"
                maxSize="300"
                size="200"
                style={{ overflow: "hidden" }}
              >
                <IO socket={socket} />
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>

          <ReflexSplitter
            className="reflex-thin"
            style={{
              backgroundColor: "#1f273d",
              opacity: "1",
              border: "0.3px",
            }}
          />

          <ReflexElement
            minSize="8"
            maxSize="250"
            size="250"
            style={{ overflow: "hidden" }}
          >
            <Chat socket={socket} />
          </ReflexElement>
        </ReflexContainer>

        <Snacker
          open={props.output_error}
          vertical= 'top'
          horizontal= 'center' 
          onClose={props.notify_output_error}
          message="Something Went Wrong!"
          severity="error"
        />

        <Snacker
          open={startMsgSnackbar}
          timer={6000}
          vertical= 'top'
          horizontal= 'center' 
          message="Share URL of this page w/ others to collaborate"
          severity="info"
          onClose={() => {
            setStartMsgSnackbar(false);
            setResizeEditorNotify(state=>state+1);
          }}
        />

        <Snacker
          open={(resizeEditorNotify==2)}
          timer={6000}
          vertical= 'top'
          horizontal= 'center' 
          message="You can also resize your editor by dragging the splitter"
          severity="info"
          onClose={() => {
            setResizeEditorNotify(3);
          }}
        />
      </div>
    </>
  ) : (
    <Spinner margin={"0px"} />
  );
};

const mapStateToProps = (state) => {
  return {
    output_success: state.tools.output_success,
    output_error: state.tools.output_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notify_output_off: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_SUCCESS,value:false }),
    notify_output_error: () => dispatch({ type: TYPES.NOTIFY_OUTPUT_ERROR,value:false }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollabPage);
