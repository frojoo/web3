import React, { useState } from "react";
import Web3 from "web3";
import { NFT_ABI, NFT_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "./web3.config";

const web3 = new Web3(window.ethereum);

const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
const nftContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();

  //Metamask 주소 불러오기
  const onClickAddress = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onclickLogOut = () => {
    setAddress("");
  };

  //TOKEN 잔고 불러오기
  const onClickBalance = async () => {
    try {
      if (!address || !tokenContract) return;

      const getBalance = await tokenContract.methods.balanceOf(address).call();

      setBalance(web3.utils.fromWei(getBalance));
    } catch (error) {
      console.error(error);
    }
  };

  //Sending NFT Mint
  const onClickMint = async () => {
    try {
      const result = await nftContract.methods
        .mintNft(
          "https://gateway.pinata.cloud/ipfs/QmfS7tQwe9tkmcaHzS5foJkPwCFFSTM2fydej3CTVoVm5x"
        )
        .send({
          from: address,
        });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      {address ? (
        <div>
          <div className="text-2xl text-slate-700">
            {address.substring(0, 4)}....{address.substring(address.length - 4)}{" "}
            <button className="btn-style text-xl ml-4" onClick={onclickLogOut}>
              LogOut
            </button>
          </div>
          <div className="flex items-center mt-4">
            {balance && (
              <div className="text-xl text-slate-700">{balance} tMATIC</div>
            )}
            <button className="btn-style ml-4" onClick={onClickBalance}>
              Balance
            </button>
          </div>
          <div className="flex items-center mt-4">
            <button className="btn-style ml-4" onClick={onClickMint}>
              Mint
            </button>
          </div>
        </div>
      ) : (
        <button className="btn-style" onClick={onClickAddress}>
          <img
            className="w-12"
            src={`${process.env.PUBLIC_URL}/images/metamask.png`}
            alt="metamask"
          />
        </button>
      )}
    </div>
  );
}

export default App;
