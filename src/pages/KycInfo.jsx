import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetKycByWalletId } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
const KycInfo = () => {
  const { id } = useParams();
  const [getKycByWalletId] = useMutation(GetKycByWalletId);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    _id: "",
    address: "",
    country: "",
    dob: "",
    email: "",
    fname: "",
    identity: "",
    isApproved: "",
    lname: "",
    phone: "",
    userWallet: "",
  });

  const getKycStatus = async () => {
    try {
      let kyc = await getKycByWalletId({
        variables: {
          walletId: id,
        },
      });
      setData({ ...kyc.data.getKycByWalletId });
    } catch (error) {
      setError("Kyc Is Not Done");
    }
  };

  useEffect(() => {
    getKycStatus();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        marginTop: "200px",
        marginLeft: "300px",
      }}
    >
      {data._id && (
        <>
          {" "}
          <div style={{ display: "flex" }}>
            <h1>Address: </h1>
            {data.address}
          </div>
          <div style={{ display: "flex" }}>
            <h1>Country: </h1>
            {data.country}
          </div>
          <div style={{ display: "flex" }}>
            <h1>DOB: </h1>
            {data.dob}
          </div>
          <div style={{ display: "flex" }}>
            <h1>Email: </h1>
            {data.email}
          </div>
          <div style={{ display: "flex" }}>
            <h1>First Name: </h1>
            {data.fname}
          </div>
          <div style={{ display: "flex" }}>
            <h1>Identity: </h1>
            {data.identity}
          </div>
          <div style={{ display: "flex" }}>
            <h1>isApproved: </h1>
            {data.isApproved}
          </div>
          <div style={{ display: "flex" }}>
            <h1>Last Name: </h1>
            {data.lname}
          </div>
          <div style={{ display: "flex" }}>
            <h1>Phone: </h1>
            {data.phone}
          </div>
          <div style={{ display: "flex" }}>
            <h1>wallet: </h1>
            {data.userWallet}
          </div>
        </>
      )}
      {!data.userWallet && <div>{error}</div>}
    </div>
  );
};

export default KycInfo;
