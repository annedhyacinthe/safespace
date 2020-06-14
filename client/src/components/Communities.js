import React, { useState, useEffect, useContext } from "react";
import { Card, Spinner, Button } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { Redirect } from "react-router-dom";

/**  */
function Communities() {
  const [response, setResponse] = useState([]);
  const [community, setCommunity] = useState();
  const [joined, setJoined] = useState(false);
  const [visited, setVisit] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch("/communities")
      .then((res) => {
        if (res.status === 200) return res.json();
        return [];
      })
      .then((json) => checkCommunities(user.id, json))
      .then((json) => setResponse(json))
  }, [setResponse])

  const checkCommunities = async (id, json) => {
    const req = await fetch(`/communitiesByUser/${id}`)
    const res = await req.json()
    console.log(res)
    console.log(json)
    for (let i = 0; i < res.length; i++) {
      for (let t = 0; t < json.length; t++) {
        if (res[i].id === json[t].id) {
          json.splice(t, 1)
        }
      }
    }
    return json
  }

  async function join (userId, communityId) {
    setCommunity(communityId)
    const newPostInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, communityId }),
    };
    const res = await fetch("/join", newPostInit);
    if (res.status === 500) {
      console.log(
        "Our computers are feeling down, please try again in a few moments."
      );
    }
    if (res.status === 200) {
      return setJoined(true);
    }
  }

  async function visit(communityId) {
    setCommunity(communityId);
    return setVisit(true);
  }

  return response.length === 0 ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
    >
      {visited && <Redirect to={`/news/visiter/${community}`} />}
      {joined && <Redirect to={`/news/member/${community}`} />}
      <div style={{ textAlign: 'center' }}>
        <div style={{marginLeft:'20vw',marginRight:'20vw'}}>
          {response.map((res, index) => (
            <Card style={{ marginBottom:'35px' }} key={index}>
              <Card.Body>
                <Card.Title>{res.name}</Card.Title>
                <Card.Text>{res.description}</Card.Text>
              </Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "8px",
                }}
              >
                <Button
                  style={{ width: "22%" }}
                  onClick={() => join(user.id, res.id)}
                >
                  Join
                </Button>
                <Button
                  style={{ width: "22%" }}
                  onClick={() => visit(res.id)}
                  variant="secondary"
                >
                  Visit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Communities;
