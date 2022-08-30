import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Web3 from 'web3';
const { ethereum } = window

const web3 = new Web3(window.ethereum);
const nft_contract_address = "0x351bbee7C6E9268A1BF741B098448477E08A0a53";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  const address = Moralis.User.current().get("ethAddress");

  async function maticTweet() {

    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0xE5032c3fdb92064082E56F8A30a432562A0d1f89",
      functionName: "addTweet",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tweetTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tweetImg",
            "type": "string"
          }
        ],
        "name": "addTweet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(0.02),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveTweet(mintNft="") {

    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();
    if(mintNft=="minted"){
      alert("NFT Minted");
    }
  }
  async function createNFT() {
    if(!tweet) return;
    
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      const imageURI = file.ipfs();
    
    const metadata = {
      "image":imageURI
    }
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    const txt = await mintToken(metadataURI);
    saveTweet("minted");
    // alert("You've successfully Minted this Image as NFT!");
    
  }
  
 
  async function mintToken(_uri){
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
      name: "mintToken",
      type: "function",
      inputs: [{
        type: 'string',
        name: 'tokenURI'
        }]
    }, [_uri]); 
  
    const transactionParameters = {
      to: nft_contract_address,
      from: address,
      data: encodedFunction
    };
    const txt = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters]
    });
    return txt
  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTxtArea"
              id = "tweet"
              placeholder="Share your thoughts here!"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>Post</div>
                <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}> Post on Blockchain
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
                <div className="tweet" onClick={createNFT} >Post and Mint NFT</div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
