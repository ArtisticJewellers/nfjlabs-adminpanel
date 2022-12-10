import React from "react";
import { truncateAddress } from "../utils/utils";
import { MdVerified } from "react-icons/md";
import { BiCopy } from "react-icons/bi";
import { GetAllUsers } from "../graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import { VerifyUser } from "../graphql/mutations";
import { message } from "antd";
function Products() {
  const { data: users } = useQuery(GetAllUsers);
  const [messageApi, contextHolder] = message.useMessage();

  const [verifyUser] = useMutation(VerifyUser);
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
                  Verify
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Profile Badge
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
                        <p class="text-gray-900 whitespace-no-wrap">
                          {item?.username}
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
                    <span class="relative inline-block px-3 py-1 font-semibold  leading-tight">
                      {item?.isVerified ? (
                        <>
                          <MdVerified size={30} className="text-sky-500" />
                        </>
                      ) : (
                        <MdVerified size={30} className="text-red-900" />
                      )}
                    </span>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <button
                      onClick={() =>
                        verifyUser({
                          variables: {
                            userId: item?._id,
                            isVerified: !item?.isVerified,
                          },
                          refetchQueries: [{ query: GetAllUsers }],
                        })
                      }
                      className="bg-black text-white group   items-center rounded-md px-5 py-2 text-sm"
                    >
                      {!item?.isVerified ? "Approve" : "Reject"}
                    </button>
                  </td>
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
