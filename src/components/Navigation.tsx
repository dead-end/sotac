import { A } from "@solidjs/router";
import { Component, For } from "solid-js";

const Navigation: Component<{
  items: { label: string; href: string }[];
}> = ({ items }) => {
  return (
    <nav>
      <ul class="flex flex-row justify-end">
        <For each={items}>
          {(item) => {
            return (
              <li class="p-4 hover:text-indigo-700">
                <A href={item.href}>{item.label}</A>
              </li>
            );
          }}
        </For>
      </ul>
    </nav>
  );
};

export default Navigation;
