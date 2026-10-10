import { createUser, getUserByName, getUsers } from "../lib/db/queries/users";
import { readConfig, setUser } from "../config";
// import { users } from "src/lib/db/schema";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const userName = args[0]
  const validatedUser = await getUserByName(userName);
  if (!validatedUser) {
    throw new Error(`user not found!`)
  }
  setUser(userName);
  console.log("User switched successfully!")
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  const userName = args[0];
  const createdUser = await createUser(userName);
  console.log(`user ${createdUser.name} created successfully!`)
  setUser(userName);
}

export async function handlerUsers(_: string) {
  const userList = await getUsers();
  const config = readConfig();

  const currentUser = config.currentUserName;

  for (const user of userList) {
    if (user.name === currentUser) {
      console.log(user.name + ' (current)');
    } else {
      console.log(user.name)
    }
  }
}
