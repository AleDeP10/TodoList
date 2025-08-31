import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Dropdown from "../lib/components/ui/Dropdown";
import { useState } from "react";
import "./sharedInputStyles.css";

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

const stringOptions = ["Option 1", "Option 2", "Option 3"];

type User = { username: string, fullName: string }

const users: User[] = [
  { username: "admin", fullName: "Administrator" },
  { username: "aledep", fullName: "Alessandro De Prato" },
  { username: "gabri", fullName: "Gabriela Belmani" },
];

// 🔹 Story 1: Dropdown con stringhe
const StringDropdownComponent = () => {
  const [selectedValue, setSelectedValue] = useState("Option 1");

  return (
    <>
      <div className="inputRow">
        <label className="inputLabel">Choose an option</label>
        <div className="inputField">
          <Dropdown
            value={selectedValue}
            options={stringOptions}
            onChange={(newValue) => {
              setSelectedValue(newValue);
              console.log(`Dropdown updated to: ${newValue}`);
            }}
            getOptionValue={(option) => option}
            getOptionLabel={(option) => option}
          />
        </div>
      </div>
      <div className="inputRow">
        <label className="inputLabel">Selected value</label>
        <div className="outputField">{selectedValue}</div>
      </div>
    </>
  );
};

// 🔹 Story 2: Dropdown con oggetti utenti
const UserDropdownComponent = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <>
      <div className="inputRow">
        <label className="inputLabel">Assign to</label>
        <div className="inputField">
          <Dropdown
            value={selectedUser}
            options={users}
            onChange={(newUser : User) => {
              setSelectedUser(newUser);
              console.log(`Assigned to: ${newUser.username}`);
            }}
            getOptionValue={(user: User) => user.username}
            getOptionLabel={(user: User) => user.fullName}
          />
        </div>
      </div>
      <div className="inputRow">
        <label className="inputLabel">Assignee code</label>
        <div className="outputField">{selectedUser.username}</div>
      </div>
    </>
  );
};

export const WithStrings: Story = {
  render: () => <StringDropdownComponent />,
};

export const WithUsers: Story = {
  render: () => <UserDropdownComponent />,
};
