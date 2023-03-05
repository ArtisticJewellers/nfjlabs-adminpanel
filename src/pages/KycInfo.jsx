import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
          <div className="p-8 rounded border border-gray-200">
            <h1 className="font-medium text-3xl">User KYC</h1>
            <p className="text-gray-600 mt-6">
              user kyc details for wallet {id}
            </p>
            <form>
              <div className="mt-8 grid lg:grid-cols-4 gap-2">
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.fname + " " + data.lname}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.phone}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.email}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.country}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.dob}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    for="name"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Residential Address
                  </label>
                  <textarea
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-100 border border-white rounded py-1 px-3 block text-gray-700 w-400"
                    style={{ outline: "none" }}
                    value={data.address}
                    readOnly
                  />
                </div>
                <div style={{ marginTop: "25px" }}>
                  <a href={data.identity} target="_blank" style={{ cursor: "pointer" }}>
                    <label
                      for="name"
                      style={{ cursor: "pointer" }}
                    >
                      Click To View Identity Proof ↪
                    </label>
                  </a>
                </div>
              </div>
              <div className="space-x-4 mt-8">
                <Link
                  to="/users"
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                >
                  Back
                </Link>
              </div>
            </form>
          </div>
        </>
      )}
      {!data.userWallet &&
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">No KYC Found</h1>
          <p className="text-gray-600 mt-6">
            This user with wallet {id} has not submitted the kyc form
          </p>
          <form>
            <div className="space-x-4 mt-8">
              <Link
                to="/users"
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Back
              </Link>
            </div>
          </form>
        </div>}
    </div>
  );
};

export default KycInfo;
