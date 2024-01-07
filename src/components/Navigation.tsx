import { A } from "@solidjs/router";
import { Component, For } from "solid-js";

const Navigation: Component = () => {
  const navItems = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Setup",
      href: "/setup",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  return (
    <nav class="">
      <ul class="flex flex-row justify-end">
        <For each={navItems}>
          {(navItem) => {
            return (
              <li class="p-4 hover:underline hover:text-indigo-600">
                <A href={navItem.href}>{navItem.label}</A>
              </li>
            );
          }}
        </For>
      </ul>
    </nav>
  );
};

export default Navigation;
