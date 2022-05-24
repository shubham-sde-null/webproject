import React from "react";
import { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "./axios.js";
function TinderCards() {
  // const [people, setPeople] = useState([
  //   {
  //     name: "Elon Musk",
  //     url: "https://cdn.pixabay.com/photo/2021/05/02/02/05/elon-musk-6222396_960_720.jpg",
  //   },
  //   {
  //     name: "john cena",
  //     url: "https://media.gettyimages.com/photos/john-cena-visits-extra-at-burbank-studios-on-january-15-2020-in-picture-id1199801987?k=20&m=1199801987&s=612x612&w=0&h=ckP-sbpNWRDpiUhNsPit3DUhv8X0b18EtOu70kLb9uo=",
  //   },
  //   {
  //     name: "Cristanio Ronaldo",
  //     url: "https://thumbs.dreamstime.com/b/porto-portuglal-june-portugal-s-cristiano-ronaldo-team-mates-celebrate-winning-uefa-nations-league-final-wit-trophy-151963447.jpg",
  //   },
  // ]);
  // earlier we were using something like this but since we have connected our database we are going to remove everything from here
  const [people, setPeople] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/tinder/cards");
      setPeople(req.data);
    }
    fetchData();
  }, []);
  console.log(people);
  const swiped = (direction, nameToDelete) => {
    console.log("removing" + nameToDelete);
    console.log(direction);
  };
  const outOfFrame = (name) => {
    console.log(name + "left the screen");
  };
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {/* {people.map((person) => (
          <h1>{person.name}</h1>
        ))} */}
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* here I have used round parenthis not curly parenthis after arrow symbol in arrow function this was causing problem because we use curly brackets in javascript but here it is jsx  */}
    </div>
  );
}

export default TinderCards;
