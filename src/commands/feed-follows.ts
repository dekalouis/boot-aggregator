import { readConfig } from "src/config";
import { createFeedFollow, getFeedFollowsForUser } from "src/lib/db/queries/feed-follows";
import { getFeedsByURL } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage ${cmdName} <feed_url>`);
  }

  const config = readConfig();
  const user = await getUserByName(config.currentUserName);

  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feedUrl = args[0];
  const feed = await getFeedsByURL(feedUrl);
  if (!feed) {
    throw new Error(`Feed not found: ${feedUrl}`);
  }

  const ffRow = await createFeedFollow(user.id, feed.id);
  console.log('Feed follow created: ');
  printFeedFollow(ffRow.userName, ffRow.feedName);
}

export async function handlerListFeedFollows(_: string) {
  const config = readConfig();
  const user = await getUserByName(config.currentUserName);

  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feedFollows = await getFeedFollowsForUser(user.id);
  if (feedFollows.length === 0) {
    console.log(`No feed follows found for this user.`);
    return;
  }

  console.log(`Feed follows for user %s:`, user.id);
  for (let ff of feedFollows) {
    console.log(`* %s`, ff.feedname);
  }
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
