import Switch from "../components/ui/Switch";

export default {
  title: "Example/Switch",
  component: Switch,
};

export const ExampleSwitch = () => (
  <Switch
    checked={false}
    onChange={(value) => console.log(`new value: ${value}`)}
    label="TODO"
  />
);
