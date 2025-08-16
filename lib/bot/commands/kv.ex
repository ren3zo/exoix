defmodule Exoix.DiscordBot.Commands.KV do
  alias Exoix.DiscordBot.DiscordApi

  def handle(_, payload) do
    kv =
      Exoix.KV.Interface.get_all(payload["author"]["id"])
      |> Enum.map(fn {k, _v} -> k end)
      |> Enum.join(", ")

    kv = if String.length(kv) > 0, do: kv, else: "No keys"

    DiscordApi.send_message(
      payload["channel_id"],
      "*`#{Application.get_env(:Exoix, :command_prefix)}get <key>` to get a value*\n*`#{Application.get_env(:Exoix, :command_prefix)}del <key>` to delete an existing key*\n*`#{Application.get_env(:Exoix, :command_prefix)}set <key> <value>` to set a key*\n\n**Keys:** ```#{kv}```"
    )
  end
end
