defmodule Exoix.DiscordBot.DiscordApi do
  @api_host "https://discord.com/api/v9"

  def send_message(channel_id, content) when is_binary(content) do
    Exoix.Metrics.Collector.inc(:counter, :Exoix_discord_messages_sent)

    sanitized_content =
      content
      |> String.replace("@", "@​\u200b")

    :post
    |> Finch.build(
      "#{@api_host}/channels/#{channel_id}/messages",
      [
        {"Authorization", "Bot " <> Application.get_env(:Exoix, :bot_token)},
        {"Content-Type", "application/json"}
      ],
      Jason.encode!(%{content: sanitized_content})
    )
    |> Finch.request(Exoix.Finch)
  end

  def create_dm(recipient) do
    {:ok, response} =
      :post
      |> Finch.build(
        "#{@api_host}/users/@me/channels",
        [
          {"Authorization", "Bot " <> Application.get_env(:Exoix, :bot_token)},
          {"Content-Type", "application/json"}
        ],
        Jason.encode!(%{recipient_id: recipient})
      )
      |> Finch.request(Exoix.Finch)

    case Jason.decode!(response.body) do
      %{"id" => id} ->
        id

      _ ->
        :ok
    end
  end
end
