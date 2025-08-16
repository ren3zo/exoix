defmodule Exoix.DiscordBot.CommandHandler do
  @command_map %{
    "get" => Exoix.DiscordBot.Commands.Get,
    "set" => Exoix.DiscordBot.Commands.Set,
    "del" => Exoix.DiscordBot.Commands.Del,
    "apikey" => Exoix.DiscordBot.Commands.ApiKey,
    "kv" => Exoix.DiscordBot.Commands.KV,
    "help" => Exoix.DiscordBot.Commands.KV
  }

  def handle_message(payload) do
    case payload.data do
      # Don't handle messages from other bots
      %{"author" => %{"bot" => true}} ->
        :ok

      %{"content" => content} ->
        if String.starts_with?(content, Application.get_env(:Exoix, :command_prefix)) do
          [attempted_command | args] =
            content
            |> String.to_charlist()
            |> tl()
            |> to_string()
            |> String.split(" ")

          unless @command_map[attempted_command] == nil do
            @command_map[attempted_command].handle(args, payload.data)
          end
        end

      _ ->
        :ok
    end
  end

  def handle_command(_unknown_command, _args), do: :ok
end
