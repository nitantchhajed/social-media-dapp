import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import { defaultImgs } from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis } from "react-moralis";


const Profile = () => {
  const { Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
    <div className="pageIdentify">Profile</div>
    <img className="profileBanner" src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}></img>
    <div className="pfpContainer">
      <img className="profilePFP" src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}></img>
      <div className="profileName">{user.attributes.username}</div>
      <div className="profileWallet">{user.attributes.ethAddress}</div>
      <Link to="/settings">
          <div className="profileEdit">Edit profile</div>
      </Link>
      
      <div className="profileBio">
      {user.attributes.bio}
      
      </div>
      <a href= { user.attributes.opensea } target="_blank">
      
      <div className="profileBio">
      {user.attributes.opensea}
      
      </div>
      </a>
      <div className="profileTabs">
                <div className="profileTab">
              Your Posts
              
          </div>
          
          
      </div>
      <Link to="/profile1">
          <div className="profileEdit">Your NFTs</div>
      </Link>
    </div>
    <TweetInFeed profile={true}></TweetInFeed>
    </>
  );
};

export default Profile;