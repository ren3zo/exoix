defmodule Exoix.Api.Routes.Discord do
  alias Exoix.Api.Util

  use Plug.Router
  plug(:match)
  plug(:dispatch)

  get "/" do
    # Discord invite URL
    Util.redirect(conn, "https://discord.gg/WScAm7vNGF")
  end
end
