import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserStatus } from "@/lib/types/Status";
import { ThemeName } from "@/lib/types/ThemeName";
import Dropdown from "../lib/components/ui/Dropdown";
import { InteractionSandbox } from "./InteractionSandbox";
import "./sharedOutputStyles.css";

const meta: Meta<typeof Dropdown> = {
  title: "Controls/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

type User = { username: string; fullName: string };

const users: User[] = [
  { username: "admin", fullName: "Administrator" },
  { username: "aledep", fullName: "Alessandro De Prato" },
  { username: "gabri", fullName: "Gabriela Belmani" },
];

const stringOptions: UserStatus[] = ["ACTIVE", "BLOCKED"];

export const WithStrings: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [selectedValue, setSelectedValue] = useState("ACTIVE");

        return (
          <>
            <Dropdown
              label="Change status"
              value={selectedValue}
              options={stringOptions}
              onChange={(newValue) => {
                setSelectedValue(newValue);
                appendText(`Dropdown updated to: ${newValue}`);
              }}
              getOptionValue={(option) => option}
              getOptionLabel={(option) => option}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                User status
              </label>
              <div className="col-span-9 outputField">{selectedValue}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

export const WithUsers: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [selectedUser, setSelectedUser] = useState(users[0]);

        return (
          <>
            <Dropdown
              label="Assign to"
              value={selectedUser}
              options={users}
              onChange={(newUser: User) => {
                setSelectedUser(newUser);
                appendText(`Assigned to: ${newUser.username}`);
              }}
              getOptionValue={(user: User) => user.username}
              getOptionLabel={(user: User) => user.fullName}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Assignee code
              </label>
              <div className="col-span-9 outputField">
                {selectedUser.username}
              </div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

const themeOptions: ThemeName[] = ["dark", "custom", "light"];

export const Compact: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [selectedValue, setSelectedValue] = useState("dark");

        return (
          <>
            <div className="flex justify-end w-full">
              <div className="w-fit">
                <Dropdown
                  variant="compact"
                  label="Change theme"
                  value={selectedValue}
                  options={themeOptions}
                  onChange={(newValue) => {
                    setSelectedValue(newValue);
                    appendText(`Dropdown updated to: ${newValue}`);
                  }}
                  getOptionValue={(option) => option}
                  getOptionLabel={(option) => option}
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                Selected theme
              </label>
              <div className="col-span-9 outputField">{selectedValue}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};


export const MobileView: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [selectedValue, setSelectedValue] = useState("ACTIVE");

        return (
          <>
            <Dropdown
              label="Change status"
              value={selectedValue}
              options={stringOptions}
              onChange={(newValue) => {
                setSelectedValue(newValue);
                appendText(`Dropdown updated to: ${newValue}`);
              }}
              getOptionValue={(option) => option}
              getOptionLabel={(option) => option}
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <label className="col-span-3 text-sm font-medium text-left">
                User status
              </label>
              <div className="col-span-9 outputField">{selectedValue}</div>
            </div>
          </>
        );
      }}
    </InteractionSandbox>
  ),
};

MobileView.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};