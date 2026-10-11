import { createFeedFollow } from "src/lib/db/queries/feed-follows";
import { readConfig } from "../config";
import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { Feed, User, users } from "../lib/db/schema";

export async function handlerAdd(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <feed_name> <url>`);
  }
  const [feedName, url] = args
  if (!feedName) {
    throw new Error(`feed not found!`)
  }

  const config = readConfig();
  const user = await getUserByName(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feed = await createFeed(feedName, url, user.id);
  if (!feed) {
    throw new Error("Failed to create feed");
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);


  printFeed(feed, user)
  return feed;
}

export async function handlerFeeds(_: string) {
  const feedList = await getFeeds();
  for (const feed of feedList) {
    console.log(feed.name);
    console.log(feed.url);
    console.log(feed.userName)
  }
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
