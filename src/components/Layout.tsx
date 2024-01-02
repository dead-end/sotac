import { ParentComponent } from "solid-js";

const Layout: ParentComponent = (props) => {
  return (
    <div class="text-gray-700 max-w-screen-xl m-auto bg-blue-50">
      <header class="bg-blue-300">
        <h1 class="text-xl font-bold text-center py-4">Sotac 1.0</h1>
      </header>
      <main class="p-6">{props.children}</main>
      <footer class="w-full py-2 pr-6 text-sm text-end bg-blue-300">
        Copyright &copy; 2024 Volker Senkel
      </footer>
    </div>
  );
};

export default Layout;
