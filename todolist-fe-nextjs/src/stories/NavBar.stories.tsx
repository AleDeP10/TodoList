import NavBar from "../components/ui/NavBar";

export default {
  title: "Layout/NavBar",
  component: NavBar,
  tags: ["autodocs"],
};

export const Example = () => (
  <NavBar
    menuItems={{
      Functionalities: [
        { label: "Tasks", onClick: () => alert("Tasks") },
        { label: "Users", onClick: () => alert("Users") },
      ],
      About: [
        { label: "The author", onClick: () => alert("Author") },
        { label: "Portfolio", href: "https://aledep10.github.io" },
      ],
    }}
  />
);
