import { validate } from "graphql";
import React from "react";
import { RemoveArtist } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GetPopularCreators } from "../../graphql/query";
function ArtistCard({ data }) {
  const [removeArtist] = useMutation(RemoveArtist);
  return (
    <div>
      <div className=" transition ease-in-out delay-150 hover:-translate-y-6">
        <div className="rounded-lg overflow-hidden shadow-xl max-w-[20rem] my-3 ">
          <img src={data?.bg_image} className="w-full object-fit h-[180px]" />
          <div className="flex justify-center -mt-8">
            <img
              src={data?.avatar_url}
              className=" w-[100px] h-[100px] rounded-full border-solid border-white border-2 -mt-3"
            />
          </div>
          <div className="text-center px-3 pb-6 pt-2">
            <h3 className=" text-sm font-bold font-sans">@{data?.username}</h3>
          </div>
          <div
            className="px-2 pb-3"
            onClick={() => {
              removeArtist({
                variables: {
                  userId: data._id,
                  popularCollection: "top_creators",
                },
                refetchQueries: [
                  {
                    query: GetPopularCreators,
                    variables: { popularCollection: "top_creators" },
                  },
                ],
              }).then((res) => {
                console.log(res);
              });
            }}
          >
            <div className="rounded-md cursor-pointer w-full px-3 py-2 text-center bg-red-500  hover:bg-red-400 text-white">
              Remove
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
