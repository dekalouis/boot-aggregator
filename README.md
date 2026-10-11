# Gator

Gator is a command-line RSS feed aggregator written in TypeScript. Register users, add RSS feeds, follow them, and let gator collect posts into a Postgres database.

## Requirements

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally or remotely

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a database (e.g. `gator`) in Postgres.

3. Create the config file `~/.gatorconfig.json`:

   ```json
   {
     "db_url": "postgres://user:password@localhost:5432/gator?sslmode=disable",
     "current_user_name": ""
   }
   ```

   `db_url` is your Postgres connection string. `current_user_name` is set automatically when you log in or register.

4. Run the migrations:

   ```sh
   npm run migrate
   ```

## Usage

```sh
npm start <command> [args]
```

| Command | Description |
| --- | --- |
| `register <name>` | Create a user and log in as them |
| `login <name>` | Switch to an existing user |
| `users` | List all users |
| `addfeed <name> <url>` | Add a feed (and follow it) |
| `feeds` | List all feeds |
| `follow <url>` | Follow an existing feed |
| `following` | List feeds the current user follows |
| `unfollow <url>` | Unfollow a feed |
| `agg <duration>` | Continuously fetch feeds, e.g. `agg 1m` |
| `reset` | Delete all users (development only) |

### Example

```sh
npm start register alice
npm start addfeed "Boot.dev Blog" https://www.boot.dev/blog/index.xml
npm start agg 1m
```
