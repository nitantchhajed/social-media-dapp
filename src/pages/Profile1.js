import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import './Settings.css';
import { defaultImgs } from "../defaultimgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useState, useEffect } from "react";


const Profile1 = () => {
  const { Moralis,  isAuthenticated, account} = useMoralis();
  const Web3Api= useMoralisWeb3Api();
  const [pfps, setPfps] = useState([]);
  const user = Moralis.User.current();
  
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };  

  useEffect(() => {

    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address: account
      }

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      const images = mumbaiNFTs.result.map(
        (e) => resolveLink(JSON.parse(e.metadata)?.image)
      );
      console.log(mumbaiNFTs);
      setPfps(images);
    }

    fetchNFTs();

  },[isAuthenticated, Web3Api, account])

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
      <div className="profileTabs">
          <div className="profileTab">
          Your NFTs
          </div>
          
          
      </div>
      
    </div>
    <Link to="/profile">
          <div className="profileEdit">Your Posts</div>
      </Link>
    <div className="pfp">
          

          <div className="pfpOptions">
            {pfps.map((e,i) => {

              return(
                <>
                <img
                src={e}
                className={
                   "pfpOptionSelected1"
                }
                // onClick={() => {setSelectedPFP(pfps[i]);}}
                ></img>
                </>
              )
            })}
          </div>
        </div>
    </>
  );
};

export default Profile1;