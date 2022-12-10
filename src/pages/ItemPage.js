import React, { useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { BsListNested } from "react-icons/bs";
import { useParams, useHistory } from "react-router-dom";
import { getNetworkSymbol, truncateAddress } from "../utils/utils";
import { useQuery } from "@apollo/client";
import { GetNftDetails } from "../graphql/query";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
function ItemPage() {
  const [metaData, setData] = useState([]);
  const { network, tokenId, address } = useParams();
  const history = useHistory();
  const storage = new ThirdwebStorage();
  const { data: nftDetails } = useQuery(GetNftDetails, {
    variables: { contractAddress: address, tokenId: parseInt(tokenId) },
  });
  useEffect(() => {
    if (nftDetails?.getNftDetails) {
      storage.downloadJSON(nftDetails?.getNftDetails?.ipfsUrl).then((res) => {
        console.log(res);
        setData(res);
      });
    }
  }, [nftDetails?.getNftDetails]);
  console.log(nftDetails?.getNftDetails);
  return (
    <div>
      <div className="max-w-[1500px] mx-auto w-full ">
        <div className="flex flex-col md:flex-row justify-center gap-[20px] py-5 px-[30px] mt-10">
          <div className="w-[500px] px-10">
            <img
              src={nftDetails?.getNftDetails?.imageUrl}
              alt=""
              className="w-full mx-auto "
            />
          </div>
          <div className="flex-1">
            <h6 className="text-darkblue font-bold text-3xl">
              {nftDetails?.getNftDetails?.name}
            </h6>

            <div className="flex items-center gap-4 py-4">
              <div>
                <h5 className="font-semibold">
                  {" "}
                  Owned by{" "}
                  <span className="text-sky-500">
                    {truncateAddress(nftDetails?.getNftDetails?.ownerAddress)}
                  </span>{" "}
                </h5>
              </div>
            </div>
            <div className="border p-5 rounded-lg">
              <h5 className="capitalize text-grey">Price</h5>
              <div className="flex gap-4  items-center">
                <h2 className="text-black  font-bold ">
                  {nftDetails?.getNftDetails?.price}
                  {"  "}
                  <span className="font-bold text-xl m-0">
                    {getNetworkSymbol(nftDetails?.getNftDetails?.chainId)}
                  </span>
                </h2>
              </div>
              <div className="flex border-green-500 mt-2 hover:text-white hover:bg-green-500 cursor-pointer text-green-500  justify-center items-center gap-2 border rounded-lg p-2 max-w-[300px] w-full make-offer ">
                <MdLocalOffer className="" />
                <p className="capitalize  p-0 mb-[0rem] font-bold  ">Approve</p>
              </div>
              <div className="flex border-red-500 mt-2  hover:text-white hover:bg-red-500 cursor-pointer text-red-500   justify-center items-center gap-2 border rounded-lg p-2 max-w-[300px] w-full make-offer ">
                <MdLocalOffer />
                <p className="capitalize p-0 mb-[0rem] font-bold ">Reject</p>
              </div>
            </div>
            <div className="my-10 border items-center rounded-lg ">
              <div className="flex gap-4 items-center px-2 py-3">
                <BsListNested size={25} className="text-grey" />
                <h4 className="capitalize text-grey font-bold text-lg p-0 m-0">
                  description
                </h4>
              </div>
              <hr />
              <p className="py-4 px-6 text-md p-0 m-0  text-md">
                {metaData?.description}
              </p>
              <hr />
              <div className="flex gap-4 items-center p-3 ">
                <AiOutlineFileText size={25} className="text-grey" />
                <h4 className="capitalize text-grey font-bold text-lg p-0 m-0">
                  details
                </h4>
              </div>
              <hr />
              <div className="  p-3 ">
                <div className="flex  gap-[40px]  justify-between items-center">
                  <h4 className="capitalize text-lg">contract address</h4>
                  <h4 className="text-lg  font-bold uppercase text-sky-500">
                    {truncateAddress(address)}
                  </h4>
                </div>
                <div className="flex  gap-[40px] justify-between  items-center">
                  <h4 className="capitalize text-lg">token ID</h4>
                  <h4 className="text-lg  font-bold uppercase text-sky-500">
                    {tokenId}
                  </h4>
                </div>

                <div className="flex  gap-[40px] justify-between  items-center">
                  <h4 className="capitalize text-lg">token standard</h4>
                  <h4 className="text-lg  font-bold uppercase">erc-721</h4>
                </div>
                <div className="flex  gap-[40px] justify-between  items-center">
                  <h4 className="capitalize  text-lg">chain</h4>
                  <h4 className="text-lg  font-bold capitalize">{network}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
