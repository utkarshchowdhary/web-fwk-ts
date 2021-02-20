import { Collection } from "./models/Collection";
import { User } from "./models/User";
import { UserList } from "./views/UserList";
// import { UserEdit } from "./views/UserEdit";

// const user = User.buildUser({ name: "Utkarsh", age: 21 });
const users = new Collection("http://localhost:3000/users", User.buildUser);

users.on("change", () => {
  const rootEl = document.querySelector("#root");
  if (rootEl) {
    new UserList(rootEl, users).render();
  } else {
    throw new Error("Root Element not found!");
  }
});

users.fetch();

// const rootEl = document.querySelector("#root");

// if (rootEl) {
//   const userEdit = new UserEdit(rootEl, user);
//   userEdit.render();
// } else {
//   throw new Error("Root Element not found!");
// }
