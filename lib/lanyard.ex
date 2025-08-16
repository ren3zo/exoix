defmodule Exoix do
  require Logger
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    :ets.new(:cached_presences, [:named_table, :set, :public])
    :ets.new(:global_subscribers, [:named_table, :set, :public])

    children = [
      {Finch, name: Exoix.Finch},
      {GenRegistry, worker_module: Exoix.Presence},
      {Exoix.Metrics, :normal},
      {Exoix.Connectivity.Redis, []},
      {Exoix.DiscordBot, %{token: Application.get_env(:Exoix, :bot_token)}},
      {Bandit,
       plug: Exoix.Api.Router, scheme: :http, port: Application.get_env(:Exoix, :http_port)}
    ]

    opts = [strategy: :one_for_one, name: Exoix.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def is_idempotent?() do
    case System.get_env("BOT_IDEMPOTENCY_ENV_KEY") do
      nil ->
        true

      "" ->
        true

      key ->
        case String.split(key, "=", parts: 2, trim: true) do
          [env_key, expected_value] ->
            System.get_env(env_key) == expected_value

          _ ->
            false
        end
    end
  end
end
