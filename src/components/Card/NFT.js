import React, { useState } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import NFTCard from "../../components/Cards/NFTCard/NFTCard";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../components/Header/Header";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TabGroup } from "@statikly/funk";

import Users from "../Users/Users";
const NFT = () => {
  const [active, setActive] = useState("");
  const navigation = [
    // { name: "Collections", current: true },
    { name: "NFTS", to: "/nft", current: false },
    // { name: "Create", to: "/create", current: false },
    { name: "Users", to: "/users", current: false },
  ];

  const FakeData = [
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE2NjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
    },
  ];
  const items = [
    {
      //   label: "Event",
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center gap-[20px] md:px-[20px] px-0  py-5 ">
        <div className="border bg-cyan p-2 rounded-lg px-5">
          <button className="capitalize text-lg "> {"<"} filter </button>
        </div>

        <div className="flex-1">
          <SearchComponent placeholder={" by NFTs"} />
        </div>
      </div>
      <div className="max-w-[1500px]  mx-auto">
        <div className=" ">
          <div className="px-2">
            <div className="py-10 ">
              <div className="flex flex-col md:flex-row justify-center gap-5 max-w-[1500px] mx-auto md:px-[20px] px-0  md:max-h-[700px] h-auto">
                <div className="sticky h-auto  md:top-[120px] top-auto bg-white md:max-h-[700px]">
                  <div className="border-b-1">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className=" border-b-2 py-3">
                          <div className="flex gap-5 justify-between   py-3">
                            <img
                              src={
                                process.env.PUBLIC_URL + "./assets/nftlogo.png"
                              }
                              alt=""
                            />
                            <p className="p-0 m-0  font-thin text-black">
                              Explore
                              <br />
                              Select Blockchain
                            </p>
                          </div>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                  <div className="border-b-2 pb-4">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className="  py-3">
                          <h4 className="capitalize font-bold text-lg p-0 m-0">
                            status
                          </h4>

                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    <div className="flex gap-5  pt-5 pb-3">
                      <button className="bg-black rounded-lg px-4 py-3 text-white capitalize">
                        all
                      </button>
                      <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize">
                        buy now
                      </button>
                    </div>
                    <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize">
                      live auction
                    </button>
                  </div>

                  <div className="border-b-2 pb-4">
                    <Dropdown
                      menu={{
                        items,
                      }}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className=" py-3">
                          <h4 className="capitalize font-bold text-lg p-0 m-0">
                            price
                          </h4>

                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    <div className="flex gap-5  items-center pt-5 pb-3">
                      <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                        min
                      </button>
                      <p className="p-0 m-0 text-grey">to</p>
                      <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                        max
                      </button>
                      <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize">
                        ETH
                      </button>
                    </div>
                    <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize w-full ">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className=" bg-collection-img bg-no-repeat bg-cover pt-3 px-3 max-h-[700px] overflow-y-scroll">
                    <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 grow  ">
                      {FakeData.map((item, key) => (
                        <Link to="/nft/nftpage">
                          <NFTCard key={key} data={item} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFT;
const Language = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left -lg my-5">
        <div>
          <Menu.Button className="inline-flex w-full justify-center border rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700  ">
            <div className="">Language</div>
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/setting"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    English
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    French
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Chinese
                  </a>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Japanese
                    </button>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
