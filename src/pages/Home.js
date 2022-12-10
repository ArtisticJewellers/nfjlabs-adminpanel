import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import NFTCard from "../components/Card/NFTCard";
import { GetAllNfts } from "../graphql/query";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
function Home() {
  const { data: nfts } = useQuery(GetAllNfts);
  return (
    <div className="ml-[250px]">
      <div className=" container w-full">
        <Tabs>
          <TabList>
            <Tab>Active</Tab>
            <Tab>Reject</Tab>
          </TabList>

          <TabPanel>
            <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
              {nfts?.nfts?.map(
                (val, item) =>
                  // <Link
                  //   key={item}
                  //   to={`/assets/${val.network}/${val.contractAddress}/${val.tokenId}`}
                  // >
                  val.isApproved && <NFTCard data={val} />
                // </Link>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
              {nfts?.nfts?.map(
                (val, item) =>
                  // <Link
                  //   key={item}
                  //   to={`/assets/${val.network}/${val.contractAddress}/${val.tokenId}`}
                  // >
                  !val.isApproved && <NFTCard data={val} />
                // </Link>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
