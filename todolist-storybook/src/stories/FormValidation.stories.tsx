import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useFieldValidation } from "../lib/hooks/useFieldValidation";
import { Button } from "../lib/components/ui/Button";
import TextField from "../lib/components/ui/TextField";
import { TestWrapper } from "./InteractionSandbox";
import "./sharedInputStyles.css";

const meta: Meta<typeof TextField> = {
  title: "Controls/FormValidation",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MandatoryField: Story = {
  render: () => (
    <TestWrapper>
      {(appendText) => {
        const [fullName, setFullName] = useState("");

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { fullName }, // fields
            ["fullName"], // mandatory fields
            {} // no custom validation
          );

        return (
          <div className="formContainer">
            <div className="inputRow">
              <label className="inputLabel" htmlFor="fullName">
                Full Name
              </label>
              <div className="inputColumn">
                <TextField
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => markTouched("fullName")}
                  error={hasError("fullName")}
                  helperText={getHelperText("fullName")}
                  placeholder="Enter full name"
                />
              </div>
            </div>
            <div className="inputRow">
              <div className="inputLabel" />
              <Button
                label="Save"
                variant="primary"
                disabled={!isFormValid}
                onClick={() => appendText(`Saving: ${fullName}`)}
              />
            </div>
          </div>
        );
      }}
    </TestWrapper>
  ),
};

export const CustomValidation: Story = {
  render: () => (
    <TestWrapper>
      {(appendText) => {
        const [website, setWebsite] = useState("");

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { website }, // fields
            [], // no mandatory fields
            {
              website: {
                validate: (val) =>
                  val.trim() === "" || /^https?:\/\/.+\..+/.test(val),
                helperText:
                  "Must be a valid URL starting with http:// or https://",
              },
            }
          );

        return (
          <div className="formContainer">
            <div className="inputRow">
              <label className="inputLabel" htmlFor="website">
                Personal Website (optional)
              </label>
              <div className="inputColumn">
                <TextField
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  onBlur={() => markTouched("website")}
                  error={hasError("website")}
                  helperText={getHelperText("website")}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="inputRow">
              <div className="inputLabel" />
              <Button
                label="Save"
                variant="primary"
                disabled={!isFormValid}
                onClick={() =>
                  appendText(
                    website.trim()
                      ? `Saving website: ${website}`
                      : "Saving without website"
                  )
                }
              />
            </div>
          </div>
        );
      }}
    </TestWrapper>
  ),
};

export const UsernameValidation: Story = {
  render: () => (
    <TestWrapper>
      {(appendText) => {
        const [username, setUsername] = useState("");

        const takenUsernames = ["admin", "aledep", "gabri"];

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { username }, // fields
            ["username"], // mandatory fields
            {
              username: {
                validate: (val) =>
                  val.trim() !== "" &&
                  !takenUsernames.includes(val.trim().toLowerCase()),
                helperText: "Username already exists in the system",
              },
            }
          );

        return (
          <div className="formContainer">
            <div className="inputRow">
              <div className="inputLabel" />
              <div className="text-sm text-gray-600">
                <p>Existing usernames:</p>
                <div className="flex gap-4 mt-1">
                  {takenUsernames.map((name) => (
                    <span key={name} className="px-2 py-1 bg-gray-100 rounded">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="inputRow">
              <label className="inputLabel" htmlFor="username">
                Username
              </label>
              <div className="inputColumn">
                <TextField
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => markTouched("username")}
                  error={hasError("username")}
                  helperText={getHelperText("username")}
                  placeholder="Choose a username"
                />
              </div>
            </div>
            <div className="inputRow">
              <div className="inputLabel" />
              <Button
                label="Save"
                variant="primary"
                disabled={!isFormValid}
                onClick={() => appendText(`Saving username: ${username}`)}
              />
            </div>
          </div>
        );
      }}
    </TestWrapper>
  ),
};

export const FullFormValidation: Story = {
  render: () => (
    <TestWrapper>
      {(appendText) => {
        const [fullName, setFullName] = useState("");
        const [username, setUsername] = useState("");
        const [website, setWebsite] = useState("");

        const takenUsernames = ["admin", "aledep", "gabri"];

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { fullName, username, website }, // fields
            ["fullName", "username"], // mandatory
            {
              username: {
                validate: (val) =>
                  val.trim() !== "" &&
                  !takenUsernames.includes(val.trim().toLowerCase()),
                helperText: "Username already exists in the system",
              },
              website: {
                validate: (val) =>
                  val.trim() === "" || /^https?:\/\/.+\..+/.test(val),
                helperText:
                  "Must be a valid URL starting with http:// or https://",
              },
            }
          );

        if (process.env.NODE_ENV !== "production") {
          console.log("Button[Save]", {
            isFormValid,
            disabled: !isFormValid,
          });
        }
        
        return (
          <div className="formContainer">
            <div className="inputRow">
              <div className="inputLabel" />
              <div className="text-sm text-gray-600">
                <p>Existing usernames:</p>
                <div className="flex gap-4 mt-1">
                  {takenUsernames.map((name) => (
                    <span key={name} className="px-2 py-1 bg-gray-100 rounded">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="inputRow">
              <label className="inputLabel" htmlFor="fullName">
                Full Name
              </label>
              <div className="inputColumn">
                <TextField
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => markTouched("fullName")}
                  error={hasError("fullName")}
                  helperText={getHelperText("fullName")}
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div className="inputRow">
              <label className="inputLabel" htmlFor="username">
                Username
              </label>
              <div className="inputColumn">
                <TextField
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => markTouched("username")}
                  error={hasError("username")}
                  helperText={getHelperText("username")}
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div className="inputRow">
              <label className="inputLabel" htmlFor="website">
                Personal Website (optional)
              </label>
              <div className="inputColumn">
                <TextField
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  onBlur={() => markTouched("website")}
                  error={hasError("website")}
                  helperText={getHelperText("website")}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputLabel" />
              <Button
                label="Save"
                variant="primary"
                disabled={!isFormValid}
                onClick={() => {
                  appendText(
                    `Saving user: ${fullName} (${username})` +
                      (website.trim() ? ` with website ${website}` : "")
                  );
                }}
              />
            </div>
          </div>
        );
      }}
    </TestWrapper>
  ),
};
