import Config

config :Exoix,
  discord_spotify_activity_id: "spotify:1"

import_config "#{Mix.env()}.exs"
