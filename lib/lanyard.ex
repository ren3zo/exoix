defmodule Exoix do
  require Logger
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    :ets.new(:cached_presences, [:named_table, :set, :public])
    :ets.new(:global_subscribers, [:named_table, :set, :public])

    # Start core services first
    core_children = [
      {Finch, name: Exoix.Finch},
      {GenRegistry, worker_module: Exoix.Presence},
      {Exoix.Metrics, :normal}
    ]

    # Start HTTP server (most important for Railway)
    http_children = [
      {Bandit,
       plug: Exoix.Api.Router, scheme: :http, port: Application.get_env(:Exoix, :http_port)}
    ]

    # Start optional services (Redis and Discord bot)
    optional_children = [
      {Exoix.Connectivity.Redis, []},
      {Exoix.DiscordBot, %{token: Application.get_env(:Exoix, :bot_token)}}
    ]

    # Start core services
    {:ok, core_supervisor} = Supervisor.start_link(core_children, [strategy: :one_for_one, name: Exoix.CoreSupervisor])

    # Start HTTP server
    {:ok, http_supervisor} = Supervisor.start_link(http_children, [strategy: :one_for_one, name: Exoix.HttpSupervisor])

    # Start optional services with restart strategy
    {:ok, optional_supervisor} = Supervisor.start_link(optional_children, [
      strategy: :one_for_one, 
      name: Exoix.OptionalSupervisor,
      max_restarts: 10,
      max_seconds: 60
    ])

    {:ok, core_supervisor}
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
