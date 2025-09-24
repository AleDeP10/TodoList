import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserStatus } from "../lib/types/Status";
import { useFieldValidation } from "../lib/hooks/useFieldValidation";
import { Button } from "../lib/components/ui/Button";
import Dropdown from "../lib/components/ui/Dropdown";
import Switch from "../lib/components/ui/Switch";
import TextField from "../lib/components/ui/TextField";
import { InteractionSandbox } from "./InteractionSandbox";
import "./sharedOutputStyles.css";

const meta: Meta<typeof TextField> = {
  title: "Controls/FormValidation",
  component: TextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `⚠️ Known issue: The MandatoryField and UsernameValidation stories suffer from layout inconsistencies in both the Storybook 'Docs' preview and the 'Example' view.

Symptoms:
- Input fields and buttons appear visually compressed or misaligned
- Grid layout using 'grid-cols-12' and 'col-span-*' is not respected
- Label and input spacing is inconsistent despite identical JSX structure
- In UsernameValidation, the presence of a single field above the button causes unexpected layout collapse

Comparison:

✅ CustomValidation and FullFormValidation render correctly and maintain consistent spacing and alignment.

❌ MandatoryField and UsernameValidation use the same JSX structure but are arbitrarily broken by Storybook's rendering engine.

This issue affects only the Storybook interface and does not impact the live frontend.

✅ Layout and behavior are correct in the actual application.

Verdict: Better done than perfect — the issue has been acknowledged and deprioritized to complete the release. Please ignore the visual imperfection in Storybook.`,
      },
    },
  },

  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MandatoryField: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [fullName, setFullName] = useState("");

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { fullName }, // fields
            ["fullName"], // mandatory fields
            {} // no custom validation
          );

        return (
          <div className="w-full max-w-[800px] mx-auto">
            <TextField
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => markTouched("fullName")}
              error={hasError("fullName")}
              helperText={getHelperText("fullName")}
              placeholder="Enter full name"
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <div className="col-span-3" />
              <div className="col-span-9 text-left">
                <Button
                  label="Save"
                  variant="primary"
                  disabled={!isFormValid}
                  onClick={() => appendText(`Saving: ${fullName}`)}
                />
              </div>
            </div>
          </div>
        );
      }}
    </InteractionSandbox>
  ),
};

export const CustomValidation: Story = {
  render: () => (
    <InteractionSandbox>
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
          <div className="w-full max-w-[800px] mx-auto">
            <TextField
              label="Website (optional)"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onBlur={() => markTouched("website")}
              error={hasError("website")}
              helperText={getHelperText("website")}
              placeholder="https://example.com"
            />
            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <div className="col-span-3" />
              <div className="col-span-9 text-left">
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
          </div>
        );
      }}
    </InteractionSandbox>
  ),
};

export const UsernameValidation = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [username, setUsername] = useState("");

        const takenUsernames = ["admin", "aledep", "gabri"];

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation({ username }, ["username"], {
            username: {
              validate: (val) =>
                val.trim() !== "" &&
                !takenUsernames.includes(val.trim().toLowerCase()),
              helperText: "Username already exists in the system",
            },
          });

        return (
          <div className="w-full max-w-[800px] mx-auto">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3" />
              <div className="col-span-9 text-left text-sm text-gray-600">
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

            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => markTouched("username")}
              error={hasError("username")}
              helperText={getHelperText("username")}
              placeholder="Choose a username"
            />

            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <div className="col-span-3" />
              <div className="col-span-9 text-left">
                <Button
                  label="Save"
                  variant="primary"
                  disabled={!isFormValid}
                  onClick={() => appendText(`Saving username: ${username}`)}
                />
              </div>
            </div>
          </div>
        );
      }}
    </InteractionSandbox>
  ),
};

export const FullFormValidation: Story = {
  render: () => (
    <InteractionSandbox>
      {(appendText) => {
        const [fullName, setFullName] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [website, setWebsite] = useState("");
        const [administrator, setAdministrator] = useState(false);
        const [status, setStatus] = useState("ACTIVE");

        const stringOptions: UserStatus[] = ["ACTIVE", "BLOCKED"];

        const takenUsernames = ["admin", "aledep", "gabri"];

        const { isFormValid, markTouched, hasError, getHelperText } =
          useFieldValidation(
            { fullName, username, password, website }, // fields
            ["fullName", "username", "password"], // mandatory
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

        return (
          <div className="w-full max-w-[800px] mx-auto">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3" />
              <div className="col-span-9 text-left text-sm text-gray-600">
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

            <TextField
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => markTouched("fullName")}
              error={hasError("fullName")}
              helperText={getHelperText("fullName")}
              placeholder="Enter full name"
            />

            <TextField
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => markTouched("username")}
              error={hasError("username")}
              helperText={getHelperText("username")}
              placeholder="Choose a username"
            />

            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markTouched("password")}
              error={hasError("password")}
              helperText={getHelperText("password")}
              placeholder="Choose a password"
            />

            <TextField
              label="Website (optional)"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onBlur={() => markTouched("website")}
              error={hasError("website")}
              helperText={getHelperText("website")}
              placeholder="https://example.com"
            />

            <Switch
              label="Administrator"
              checked={administrator}
              onChange={(value) => setAdministrator(value)}
            />

            <Dropdown
              label="Status"
              value={status}
              options={stringOptions}
              onChange={(newValue) => setStatus(newValue)}
              getOptionValue={(option) => option}
              getOptionLabel={(option) => option}
            />

            <div className="grid grid-cols-12 gap-4 items-center mt-4">
              <div className="col-span-3" />
              <div className="col-span-9 text-left">
                <Button
                  label="Save"
                  variant="primary"
                  disabled={!isFormValid}
                  onClick={() => {
                    appendText(
                      `Saving ${
                        administrator ? "Admin" : "User"
                      }: ${fullName} (${username})` +
                        (website.trim() ? ` with website ${website}` : "")
                    );
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    </InteractionSandbox>
  ),
};
