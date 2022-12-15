import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useLayoutEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ArtistCard from "../components/Card/ArtistCard";
import PopularNFT from "../components/Card/PopularNFT";
import {
  BannerNft,
  FeatureNft,
  GetNFTObjectId,
  GetPopularCreators,
  SignIn,
  TrendingNft,
  Wallet,
} from "../graphql/query";
import {
  AddCreator,
  AddFeatureNft,
  AddTrendingNft,
} from "../graphql/mutations";
import { CREATOR, FEATURED_NFT, TRENDING_NFT } from "../constant/constant";

function Popular() {
  const { data: artist } = useQuery(GetPopularCreators, {
    variables: { popularCollection: "top_creators" },
  });
  const { data: featured_nft } = useQuery(FeatureNft, {
    variables: { popularCollection: "featured_nft" },
  });
  const { data: trending_nft } = useQuery(TrendingNft, {
    variables: { popularCollection: "trending_nft" },
  });
  const { data: banner_nft } = useQuery(BannerNft, {
    variables: { popularCollection: "banner_nft" },
  });
  console.log(artist?.allArtist?.users);

  return (
    <div className="ml-[250px]">
      <div className=" container w-full">
        <div className="mt-5">
          <Tabs>
            <TabList>
              <Tab>Artist</Tab>
              <Tab>Banner NFT</Tab>
              <Tab>Featured NFT</Tab>
              <Tab>Trending NFT</Tab>
            </TabList>
            <TabPanel>
              <div>
                <div className="mt-5 flex  justify-between">
                  <h2 className="text-3xl font-bold">Popular Artist</h2>
                  <AddArtistModal />
                </div>
                <div className=" mt-5 grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                  {artist?.allArtist?.users?.map((val, item) => (
                    <ArtistCard data={val} key={item} />
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div className="mt-5 flex  justify-between">
                  <h2 className="text-3xl font-bold">Banner NFT</h2>
                  <h2 className="text-3xl font-bold">Banner NFT</h2>
                </div>
                <div className=" mt-5 grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                  <PopularNFT
                    data={banner_nft?.bannerNft?.bannerNft}
                    collection="banner_nft"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div className="mt-5 flex  justify-between">
                  <h2 className="text-3xl font-bold">Featured NFT</h2>
                  <AddFeaturedNftModal />
                </div>
                <div className=" mt-5 grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                  {featured_nft?.allFeatureNft?.featuredNft?.map(
                    (val, item) => (
                      <PopularNFT
                        data={val}
                        key={item}
                        collection="featured_nft"
                      />
                    )
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div className="mt-5 flex  justify-between">
                  <h2 className="text-3xl font-bold">Trending NFT</h2>
                  <AddTrendingNftModal />
                </div>
                <div className=" mt-5 grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                  {trending_nft?.allTrendingNft?.trendingNft?.map(
                    (val, item) => (
                      <PopularNFT
                        data={val}
                        key={item}
                        collection="trending_nft"
                      />
                    )
                  )}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const AddArtistModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCreator] = useMutation(AddCreator);
  const [wallet] = useLazyQuery(Wallet);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>
        <button
          className="bg-sky-500 px-3 py-2 rounded-md text-white"
          type="submit"
        >
          Add Artist
        </button>
      </div>
      <Modal
        title="Artist Add"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={async (value) => {
            console.log(value);

            let isExist = await wallet({
              variables: {
                address: value.address,
              },
            });
            if (!isExist.data.wallet) {
              alert("Please check wallet address.");
            }

            if (isExist?.data?.wallet?.user?._id) {
              addCreator({
                variables: {
                  userId: isExist?.data?.wallet?.user?._id,
                  popularCollectionId: CREATOR,
                },
                refetchQueries: [
                  {
                    query: GetPopularCreators,
                    variables: { popularCollection: "top_creators" },
                  },
                ],
              }).then((res) => {
                console.log(res);
                if (res.data.addCreator === null) {
                  alert("User already add in popular list.");
                } else {
                  alert("User add in popular list.");
                }
              });
            }
          }}
        >
          <Form.Item label="Wallet Address" name="address">
            <Input placeholder="0x12456789" />
          </Form.Item>
          <Form.Item>
            <button
              className="bg-black px-3 py-2 rounded-md text-white"
              type="submit"
            >
              Add Artist
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const AddFeaturedNftModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addFeatureNft] = useMutation(AddFeatureNft);
  const [getNFTObjectId] = useLazyQuery(GetNFTObjectId);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>
        <button
          className="bg-sky-500 px-3 py-2 rounded-md text-white"
          type="submit"
        >
          Add NFT
        </button>
      </div>
      <Modal
        title="Featured NFT Add"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={async (value) => {
            console.log(value);
            let isExist = await getNFTObjectId({
              variables: {
                tokenId: parseInt(value.tokenId),
                network: value.network,
              },
            });
            if (!isExist.data.getNFTObjectId) {
              alert("Please check nft token ID and network.");
            } else {
              addFeatureNft({
                variables: {
                  popularCollectionId: FEATURED_NFT,
                  nftId: isExist?.data?.getNFTObjectId?._id,
                },
                refetchQueries: [
                  {
                    query: FeatureNft,
                    variables: { popularCollection: "featured_nft" },
                  },
                ],
              }).then((res) => {
                console.log(res);
                if (res.data.addFeatureNft === null) {
                  alert("NFT already add in feature list.");
                } else {
                  alert("NFT add in feature list.");
                }
              });
            }
          }}
        >
          <Form.Item label="Token ID" name="tokenId">
            <Input type="number" min={0} placeholder="Example: 1" />
          </Form.Item>
          <Form.Item label="Network" name="network">
            <Select
              defaultValue={"Select Network "}
              options={[
                {
                  value: "binance",
                  label: "Binance",
                },
                {
                  value: "polygon",
                  label: "Polygon",
                },
                {
                  value: "ethereum",
                  label: "Ethereum",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <button
              className="bg-black px-3 py-2 rounded-md text-white"
              type="submit"
            >
              Add NFT
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const AddTrendingNftModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trendingNft] = useMutation(AddTrendingNft);
  const [getNFTObjectId] = useLazyQuery(GetNFTObjectId);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>
        <button
          className="bg-sky-500 px-3 py-2 rounded-md text-white"
          type="submit"
        >
          Add NFT
        </button>
      </div>
      <Modal
        title="Trending NFT Add"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          onFinish={async (value) => {
            console.log(value);
            let isExist = await getNFTObjectId({
              variables: {
                tokenId: parseInt(value.tokenId),
                network: value.network,
              },
            });
            console.log(isExist);
            if (!isExist.data.getNFTObjectId) {
              alert("Please check nft token ID and network.");
            } else {
              trendingNft({
                variables: {
                  popularCollectionId: TRENDING_NFT,
                  nftId: isExist?.data?.getNFTObjectId?._id,
                },
                refetchQueries: [
                  {
                    query: TrendingNft,
                    variables: { popularCollection: "trending_nft" },
                  },
                ],
              }).then((res) => {
                console.log(res);
                if (res.data.addTrendingNft === null) {
                  alert("NFT already add in trending list.");
                } else {
                  alert("NFT add in trending list.");
                }
              });
            }
          }}
        >
          <Form.Item label="Token ID" name="tokenId">
            <Input type="number" min={0} placeholder="Example: 1" />
          </Form.Item>
          <Form.Item label="Network" name="network">
            <Select
              defaultValue={"Select Network "}
              options={[
                {
                  value: "binance",
                  label: "Binance",
                },
                {
                  value: "polygon",
                  label: "Polygon",
                },
                {
                  value: "ethereum",
                  label: "Ethereum",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <button
              className="bg-black px-3 py-2 rounded-md text-white"
              type="submit"
            >
              Add NFT
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Popular;
