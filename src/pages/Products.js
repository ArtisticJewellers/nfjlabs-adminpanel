import React, { useState, useEffect } from "react";
import { truncateAddress } from "../utils/utils";
import { MdVerified } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { GetAllUsers } from "../graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  VerifyUser,
  ApproveUserKyc,
  GetKycByWalletId,
} from "../graphql/mutations";
import { message } from "antd";
function Products() {
  const [isApproved, setIsApproved] = useState({
    userId: "",
    isApproved: false,
  });
  const { data: users } = useQuery(GetAllUsers);
  const [messageApi, contextHolder] = message.useMessage();

  const [showKyc, setShowKyc] = useState(false);

  const [verifyUser] = useMutation(VerifyUser);
  const [approveUserKyc] = useMutation(ApproveUserKyc);
  const [getKycByWalletId] = useMutation(GetKycByWalletId);

  const approveKyc = async (userId) => {
    let kyc = await approveUserKyc({
      variables: {
        userId: userId,
      },
    });
    console.log(kyc.data.approveUserKyc.isKycApproved);
    setIsApproved({
      userId: userId,
      isApproved: kyc.data.approveUserKyc.isApproved,
    });
    window.location.reload();
    // return kyc.data.approveUserKyc.isApproved;
  };

  const getKycStatus = async (walletId) => {
    let kyc = await getKycByWalletId({
      variables: {
        walletId: walletId,
      },
    });
    console.log({ kyc });
  };

  const fetchAllKyc = async () => {
    // let {}
    // for (let i = 0; i < users?.users.length; i++) {
    // let data = await getKycStatus(users?.users[0].wallets[0].address);
    // console.log(data);
    // // }
  };

  const ShowKycModal = ({ walletId, index }) => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: "0",
            padding: "100px",
            top: "0",
          }}
        >
          <div
            style={{
              background: "grey",
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <button onClick={() => setShowKyc(false)}>Close</button>
            <div>{walletId}</div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    fetchAllKyc();
  }, [users]);

  return (
    <div>
      <div className="ml-[250px]">
        <div className="container">
          <table class="w-full leading-normal">
            <thead>
              <tr>
                {" "}
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  S.No
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Accept KYC
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View KYC
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((item, i) => (
                <tr key={i}>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <p class="text-gray-900 whitespace-no-wrap">{i + 1}.</p>
                  </td>
                  <td class="px-5 py-5  border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center justify-start">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-full h-full rounded-full object-cover"
                          src={item?.avatar_url}
                          alt=""
                        ></img>
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap flex">
                          {item?.username}
                          {item.isKycApproved ? (
                            <>
                              <MdVerified size={20} className="text-sky-500 ml-2" />
                            </>
                          ) : (
                            <MdVerified size={20} className="text-red-900 ml-2" />
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <p class="text-gray-900 whitespace-no-wrap flex justify-center">
                      {contextHolder}
                      <span> {truncateAddress(item?.wallets[0]?.address)}</span>
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            item?.wallets[0]?.address
                          );
                          messageApi.open({
                            type: "success",
                            content: "Wallet Address copied! ",
                            className: "custom-class",
                            style: {
                              marginTop: "30vh",
                              marginLeft: "250px",
                            },
                          });
                        }}
                      >
                        <BiCopy size={20} />
                      </span>
                    </p>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <div style={{ display: "block" }}>
                      {item.isKycApproved ? (
                        <button onClick={() => approveKyc(item?._id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", margin: "10px", borderRadius: "3px" }}>
                          Reject Kyc
                        </button>
                      ) : (
                        <button onClick={() => approveKyc(item?._id)} style={{ backgroundColor: "green", color: "white", padding: "5px 10px", margin: "10px", borderRadius: "3px" }}>
                          Approve Kyc
                        </button>
                      )}
                    </div>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <Link to={`/${item?.wallets[0]?.address}`} style={{ backgroundColor: "blue", color: "white", padding: "5px 10px", margin: "10px", borderRadius: "3px" }}>↪</Link>

                  </td>

                  {/* {data?.map((e, index) =>
                    e.userWallet === item?.wallets[0]?.address ? (
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <button
                          onClick={() =>
                            getKycStatus(item?.wallets[0]?.address)
                          }
                          className="bg-black text-white group items-center rounded-md px-5 py-2 text-sm"
                        >
                          {!item?.isVerified ? "Approve" : "Reject"}
                        </button>
                      </td>
                    ) : (
                      ""
                    )
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
