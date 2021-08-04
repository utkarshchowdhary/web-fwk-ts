import { User } from "./models/User";
import { UserList } from "./views/UserList";

const users = User.buildUserCollection();

users.on("change", () => {
  const rootEl = <HTMLDivElement>document.querySelector("#root");
  new UserList(rootEl, users).render();
});

users.fetch();
