import React from "react";
import './Rightbar.css';
import spaceshooter from "../images/spaceshooter.webp";
import netflix from "../images/netflix.jpg";
import academy from "../images/academy.webp";
import youtube from "../images/youtube.jpg";
import web3 from "../images/web3.png";
import js from "../images/js.webp";
import { Input } from "web3uikit";



const Rightbar = () => {
  const trends = [
    {
      img: spaceshooter,
      text: "Metaverse:The Trillion Dollar Metaverse Business Opportunity",
      link: "https://www.queppelin.com/trillion-dollar-business-opportunity-in-metaverse/",
    },
    {
      img: netflix,
      text: "What is 10K NFT? How to create NFT 10K Collection?",
      link: "https://www.queppelin.com/10k-nft-collection-project/",
    },
    {
      img: academy,
      text: "How to build dApp on Solana in 8 simple steps?",
      link: "https://www.queppelin.com/how-to-build-dapp-on-solana-blockchain/",
    },
    {
      img: js,
      text: "Top 6 Metaverse Use Cases & Applications across Industries",
      link: "https://www.queppelin.com/metaverse-use-cases/",
    },
    {
      img: youtube,
      text: "Types of 3D Modeling: Pro’s & Con’s",
      link: "https://www.queppelin.com/types-of-3d-modeling-with-pros-and-cons/",
    },
    {
      img: web3,
      text: "Web 3.0 Explained | Features, Advantages & Comparison to Web 2.0",
      link: "https://www.queppelin.com/what-is-web-3/",
    },
  ];

  return (
    <>
      <div className="rightbarContent">
        {/* <Input
          label="Search Twitter"
          name="Search Twitter"
          prefixIcon="search"
          labelBgColor="#141d26"
        >
        </Input> */}
        <div className="trends">
          Queppelin Blogs
          {trends.map((e) => {
            return (
              <>
                <div className="trend" onClick={() => window.open(e.link)}>
                  <img src={e.img} className="trendImg"></img>
                  <div className="trendText">{e.text}</div>
                </div>
              </>
            )
          })}
        </div>

      </div>
    </>
  );
};

export default Rightbar;

