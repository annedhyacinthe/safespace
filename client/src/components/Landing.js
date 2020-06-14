import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Jumbotron, Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Landing = () => {
  const { user } = useContext(UserContext);
  const [communities, setCommunities] = useState(null);

  useEffect(() => {
    const getCommunities = async () => {
      if (user) {
        const req = await fetch(`/communitiesByUser/${user.id}`);
        const list = await req.json();
        return list;
      }
    };
    getCommunities().then((list) => {
      setCommunities(list);
    });
  }, [user]);

  const JumbotronStyle = {
    background:
      'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v211batch11-aum-561-cummunity_2.jpg?w=1200&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f0977b16acfb162ea9b439acec79e19e")',
    backgroundPosition: "center 35%",
    backgroundSize: "cover",
    height: "350px",
    borderRadius: "0px",
  };

  return (
    <div>
      <Jumbotron style={JumbotronStyle}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              textAlign: "center",
              border: "7px solid white",
              padding: "15px",
            }}
          >
            <h1 style={{ color: "white" }}>Welcome to Safespace</h1>
            <p style={{ color: "white" }}>
              This is a safe space for anyone to create a community around their
              personal experiences, whatever that may be.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LinkContainer to="/register" style={{ marginTop: "18px" }}>
            <Button className="marvel-btn">Create An Account</Button>
          </LinkContainer>
        </div>
      </Jumbotron>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ border: "0px", width: "75%" }} className="text-center">
          <Card.Body>
            <Card.Title>Create Your Own Community</Card.Title>
            <Card.Text>
              Create a space for yourself and others to gather around a shared experiences and provide support and motivation for one another.
            </Card.Text>
            <LinkContainer to="/spaces">
              <Button variant="primary">Browse Communities</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ border: "0px", width: "75%" }} className="text-center">
          <Card.Body>
            <Card.Title>Find Mentorship</Card.Title>
            <Card.Text>
              Communicate with others and learn better ways to to cope from people who have dealt with and have overcamed the same experiences as you. 
            </Card.Text>
            <Button variant="primary">Find a Mentor</Button>
          </Card.Body>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ border: "0px", width: "75%" }} className="text-center">
          <Card.Body>
            <Card.Title>Tell Your Story</Card.Title>
            <Card.Text>
              Have a space to tell your story and to be heard.  
            </Card.Text>
            <Button variant="primary">Tell Your Story</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
