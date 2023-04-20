import React, { useEffect, useState } from "react";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

function App() {
  const [adress, setAdress] = useState("");

  const onClickAdress = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAdress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onclickLogOut = () => {
    setAdress("");
  };

  useEffect(() => {
    console.log(window.ethereum);
  });
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      {adress ? (
        <div className="text-2xl">
          {adress.substring(0, 4)}....{adress.substring(adress.length - 4)}{" "}
          <button className="btn-style text-xl ml-4" onClick={onclickLogOut}>
            LogOut
          </button>
        </div>
      ) : (
        <button className="btn-style" onClick={onClickAdress}>
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
