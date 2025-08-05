import ToggleButton from "../components/ui/ToggleButton";

export default {
  title: "Legacy/ToggleButton",
  component: ToggleButton,
};

export const ExampleToggle = () => (
  <ToggleButton
    initialValue="on"
    toggleTo="off"
    label={(val) => (val === "on" ? "🔛 On" : "⏹️ Off")}
    onToggle={(val) => console.log("Toggle changed to:", val)}
  />
);
