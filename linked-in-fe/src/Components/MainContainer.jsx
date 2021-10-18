import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ImPencil } from "react-icons/im";
import "../css/maincontainer.css";
import EditInfo from "./EditInfo";
import { Link, withRouter } from "react-router-dom";
import EditBgImg from "./EditBgImg";
import Skeleton from "@material-ui/lab/Skeleton";
import OpenTo from "./mainContBtns/OpenTo";
import AddSection from "./mainContBtns/AddSection";
import More from "./mainContBtns/More";

const MainContainer = ({ match }) => {
  const personId = "";
  const [PersonInfo, setPersonInfo] = useState([]);

  const [BtnsUpdate, setBtnsUpdate] = useState({
    openTo: false,
    addSection: false,
    more: false,
  });
  //   UPDATE INFO
  useEffect(() => {
    fetchPerson();
  }, []);

  useEffect(() => {
    fetchPerson();
  }, [match.params]);
  // !
  // FETCHING
  const fetchPerson = async () => {
    try {
      let response = await fetch(
        match.params.id
          ? `${process.env.REACT_APP_FETCH_BE_URL}/profiles/` + match.params.id
          : `${process.env.REACT_APP_FETCH_BE_URL}/profiles/6166fec751575eba24d693f5`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        let data = await response.json();
        setPersonInfo({data});
      } else {
        console.log("Error");
      }
    } catch (erorr) {}
  };
  //   FETCHING EXPP
 
  //   !
  //   JSX
  return (
    <div className="position-relative">
      <div className="w-100 mt-2 person-info">
        <Row>
          {/* BG IMAGE */}
          <Col xs="12" className="bg-image">
            <div
              style={{
                overflow: "hidden",
                borderTopLeftRadius: "9px",
                borderTopRightRadius: "9px",
              }}
            >
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            {!match.params.id && PersonInfo.data && (
              <EditBgImg
                bgid={PersonInfo.data._id}
                imgSrc={PersonInfo.data.image}
                renewData={() => fetchPerson()}
                valueAvatar={true}
              />
            )}
            {/* ///////////////////*/}
            {/* AVATAR */}
            {!PersonInfo.data ? (
              <Skeleton
                animation="wave"
                className="avatar position-absolute"
                variant="circle"
                height={165}
                style={{ aspectRatio: "1/1" }}
              />
            ) : (
              <EditBgImg
                bgid={PersonInfo.data._id}
                imgSrc={PersonInfo.data.image}
                renewData={() => fetchPerson()}
                valueAvatar={false}
              />
            )}
          </Col>
          <Col xs="12 d-flex flex-wrap">
            {/* LEFT SIDE */}
            <Col
              xs="12"
              md="8"
              className="d-flex flex-column align-items-start name-box"
            >
              {" "}
              {PersonInfo.data ? (
                <>
                  <h2>
                    {PersonInfo.data.name} {PersonInfo.data.surname}{" "}
                  </h2>
                  <p className="text-left m-0">{PersonInfo.data.title}</p>
                  <div className="d-flex  align-items-center">
                    <small className="text-muted mr-1">
                      {PersonInfo.data.area}
                    </small>{" "}
                    ·{" "}
                    <small className="ml-1 contact-info font-weight-bold">
                      <a href="">Contact info</a>
                    </small>{" "}
                  </div>
                </>
              ) : (
                <>
                  <Skeleton
                    className="rounded"
                    variant="rect"
                    width={200}
                    height={30}
                    style={{ borderRadius: "20px !important" }}
                  />
                  <br />
                  <Skeleton
                    className="rounded"
                    variant="rect"
                    width={130}
                    height={18}
                  />
                  <Skeleton
                    className="mt-2 rounded"
                    variant="rect"
                    width={120}
                    height={10}
                  />
                </>
              )}
              <div className="mt-3 d-flex flex-wrap">
                {/* opento */}
                <div className="position-relative">
                  <Button
                    className="font-weight-bold position-relative"
                    style={{ backgroundColor: "#0a66c2" }}
                    onClick={() =>
                      setBtnsUpdate({
                        more: false,
                        addSection: false,
                        openTo: !BtnsUpdate.openTo,
                      })
                    }
                  >
                    {match.params.id ? "Connect" : "Open to"}
                  </Button>
                  {BtnsUpdate.openTo && <OpenTo personAcc={match.params.id} />}
                </div>
                {/* AddSec */}
                <div className="position-relative">
                  <Button
                    className="font-weight-bold position-relative"
                    variant="outline-secondary"
                    onClick={() =>
                      setBtnsUpdate({
                        more: false,
                        openTo: false,
                        addSection: !BtnsUpdate.addSection,
                      })
                    }
                  >
                    {match.params.id ? "Message" : "Add section"}
                  </Button>
                  {BtnsUpdate.addSection && (
                    <AddSection
                      name={PersonInfo.data.name}
                      personAcc={match.params.id}
                    />
                  )}
                </div>
                {/* more */}
                <div className="position-relative">
                  <Button
                    className="font-weight-bold position-relative"
                    variant="outline-secondary"
                    onClick={() =>
                      setBtnsUpdate({
                        more: !BtnsUpdate.more,
                        openTo: false,
                        addSection: false,
                      })
                    }
                  >
                    More
                  </Button>

                  {BtnsUpdate.more && (
                    <More
                      personAcc={match.params.id}
                      profileId={PersonInfo.data._id}
                    />
                  )}

                  {/* {match.params.id && <More personAcc={match.params.id} />} */}
                </div>
              </div>
            </Col>
            {/* RIGHT SIDE */}
            <Col xs="12" md="4" className="d-flex flex-column p-4">
              {" "}
              <div className="d-flex justify-content-end my-2">
                {!match.params.id && PersonInfo.data ? (
                  <EditInfo
                    personId={PersonInfo.data._id}
                    name={PersonInfo.data.name}
                    surname={PersonInfo.data.surname}
                    area={PersonInfo.data.area}
                    title={PersonInfo.data.title}
                    imgSrc={PersonInfo.data.image}
                    bio={PersonInfo.data.bio}
                    username={PersonInfo.data.username}
                    email={PersonInfo.data.email}
                    renewData={fetchPerson}
                  />
                ) : (
                  !match.params.id && (
                    <Skeleton
                      className="mt-2 rounded-circle"
                      variant="rect"
                      width={25}
                      height={25}
                    />
                  )
                )}
              </div>
               {PersonInfo.data ? (
                PersonInfo.data.experiences.slice(0, 3).map((person) => (
                  <a href="" className="d-flex align-items-center my-1">
                    <img src={person.image} alt="" style={{ height: "2rem" },{ width: "2rem" }} />
                    <small className="font-weight-bold ml-2">
                      {person.role}
                    </small>
                  </a>
                ))
              ) : (
                <Skeleton
                  className="mt-2 rounded"
                  variant="rect"
                  width={140}
                  height={25}
                />
              )}
            </Col>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(MainContainer);
