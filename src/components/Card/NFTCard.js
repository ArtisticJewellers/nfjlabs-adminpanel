import { useMutation } from "@apollo/client";
import React from "react";
import { NftApproved } from "../../graphql/mutations";
import { GetAllNfts } from "../../graphql/query";
import { truncateAddress } from "../../utils/utils";

function NFTCard({ data }) {
  const [nftApproved] = useMutation(NftApproved);
  const handleApprove = (isApproved) => {
    nftApproved({
      variables: {
        isApproved: isApproved,
        nftId: data._id,
      },
      refetchQueries: [
        {
          query: GetAllNfts,
        },
      ],
    }).then((res) => {
      console.log(res);
    });
  };
  console.log(data);
  return (
    <div className="w-full max-w-[300px] mx-auto px-3 py-4 border rounded-xl bg-white mb-4 drop-shadow-lg">
      <div className="rounded-xl">
        <img className="rounded-xl w-full " src={data?.imageUrl} />
      </div>

      <div className="text-grey font-bold mt-2">{data?.name}</div>
      <div className="text-grey font-bold mt-2">
        Price: <span>{data?.price}</span> BNB
      </div>
      <div>
        <div className="flex justify-between py-1 pt-2">
          <p className="text-grey">Owner</p>
          <p className="text-grey"> Network </p>
        </div>
        <div className="flex justify-between py-1">
          <p className="font-black text-sm text-black">
            {truncateAddress(data.ownerAddress)}
          </p>
          <p className="font-black text-sm text-black capitalize">
            {data.network}
          </p>
        </div>
        {data.isApproved ? (
          <button
            onClick={() => handleApprove(false)}
            className="font-bold mt-2 bg-red-500 hover:bg-red-600 text-white  w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 hover:bg-button-img hover:bg-no-repeat hover:bg-cover hover:text-white "
          >
            Reject
          </button>
        ) : (
          <button
            onClick={() => handleApprove(true)}
            className=" font-bold mt-2 bg-emerald-500 hover:bg-emerald-600 text-white  w-full bg-no-repeat bg-cover rounded-xl py-3 px-2 hover:bg-button-img hover:bg-no-repeat hover:bg-cover hover:text-white "
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
}

export default NFTCard;
