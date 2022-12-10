import { useMutation, useQuery } from "@apollo/client";
import {
  RoleRoyaltyAddressUpdate,
  RoleRoyaltyUpdate,
} from "../graphql/mutations";
import { GetRole } from "../graphql/query";
import { Button, Form, Input } from "antd";
import React from "react";

function Settings() {
  const [roleRoyaltyUpdate] = useMutation(RoleRoyaltyUpdate);
  const [roleRoyaltyAddressUpdate] = useMutation(RoleRoyaltyAddressUpdate);
  const { data: getRole } = useQuery(GetRole, {
    variables: {
      id: "6392d510872ea2fc23f19e55",
    },
  });

  console.log(getRole?.getRole?.royalty);
  return (
    <div className="ml-[250px]">
      <div className="container">
        <div>
          <h2 className="text-2xl mt-10 font-bold">Royalty</h2>
          <div>
            <p>
              Current Roylaty is :{" "}
              <span className="text-2xl text-red-500 font-bold">
                {getRole?.getRole?.royalty / 100}
              </span>
              <Form
                className="w-[300px] mt-5"
                onFinish={(value) => {
                  roleRoyaltyUpdate({
                    variables: {
                      royalty: parseFloat(value.royalty) * 100,
                      id: "6392d510872ea2fc23f19e55",
                    },
                    refetchQueries: [
                      {
                        query: GetRole,
                        variables: {
                          id: "6392d510872ea2fc23f19e55",
                        },
                      },
                    ],
                  }).then((res) => console.log(res));
                }}
              >
                <Form.Item
                  label="Royalty"
                  name="royalty"
                  rules={[
                    {
                      required: true,
                      message: "Please input your royalty!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    min="0.1"
                    step={0.1}
                    max="40"
                    placeholder="0.1"
                  ></Input>
                </Form.Item>
                <Form.Item>
                  <button
                    className="bg-black px-3 py-2 rounded-md text-white"
                    type="submit"
                  >
                    Update
                  </button>
                </Form.Item>
              </Form>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mt-10 font-bold">Royalty Address</h2>
          <div>
            <p>
              Current Royalty Address is :{" "}
              <span className="text-2xl text-red-500 font-bold">
                {getRole?.getRole?.royaltyAddress}
              </span>
              <Form
                className="w-[300px] mt-5"
                onFinish={(value) => {
                  roleRoyaltyAddressUpdate({
                    variables: {
                      royaltyAddress: value.royaltyAddress,
                      id: "6392d510872ea2fc23f19e55",
                    },
                    refetchQueries: [
                      {
                        query: GetRole,
                        variables: {
                          id: "6393370a5fb2f6889caf5d24",
                        },
                      },
                    ],
                  }).then((res) => console.log(res));
                }}
              >
                <Form.Item
                  label="Royalty Address"
                  name="royaltyAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your royalty Address!",
                    },
                  ]}
                >
                  <Input placeholder="Ex: 0xfE9d214919c028F2DFfa2796883e61D3c778103A"></Input>
                </Form.Item>
                <Form.Item>
                  <button
                    className="bg-black px-3 py-2 rounded-md text-white"
                    type="submit"
                  >
                    Update
                  </button>
                </Form.Item>
              </Form>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
