defmodule Exoix.Connectivity.Redis do
  alias Exoix.Presence
  use GenServer
  require Logger

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: :local_redis_client)
  end

  def init(_) do
    uri =
      if Application.get_env(:Exoix, :redis_uri) != nil,
        do: Application.get_env(:Exoix, :redis_uri),
        else: "redis://#{System.get_env("REDIS_HOST")}:6379"

    case Redix.start_link(uri) do
      {:ok, client} ->
        case Redix.PubSub.start_link(uri) do
          {:ok, conn} ->
            Redix.PubSub.subscribe(conn, "Exoix:global_sync", self())
            Logger.info("Redis: Connected successfully")
            {:ok, %{client: client, conn: conn}}

          {:error, reason} ->
            Logger.warning("Redis PubSub: Failed to connect: #{inspect(reason)}")
            {:ok, %{client: client, conn: nil}}
        end

      {:error, reason} ->
        Logger.warning("Redis: Failed to connect: #{inspect(reason)}")
        {:ok, %{client: nil, conn: nil}}
    end
  end

  def handle_info({:redix_pubsub, _pubsub, _pid, :subscribed, %{channel: channel}}, state) do
    Logger.info("Redis: subscribed to #{channel}")
    {:noreply, state}
  end

  def handle_info(
        {:redix_pubsub, _pubsub, _pid, :message,
         %{channel: "Exoix:global_sync", payload: payload}},
        state
      ) do
    node_id = :erlang.phash2(node())

    case Jason.decode!(payload) do
      %{"node_id" => ^node_id} ->
        # Ignore messages from the same node
        {:noreply, state}

      %{"user_id" => uid, "diff" => diff} ->
        Presence.sync(uid, diff, true)
        {:noreply, state}

      _ ->
        Logger.error("Redis: Unknown payload format: #{inspect(payload)}")
        {:noreply, state}
    end
  end

  def handle_call({:hgetall, key}, _from, state) do
    case state[:client] do
      nil -> {:reply, {:error, :redis_not_connected}, state}
      client -> {:reply, Redix.command(client, ["HGETALL", key]), state}
    end
  end

  def handle_call({:hget, key, field}, _from, state) do
    case state[:client] do
      nil -> {:reply, {:error, :redis_not_connected}, state}
      client -> {:reply, Redix.command(client, ["HGET", key, field]), state}
    end
  end

  def handle_call({:get, key}, _from, state) do
    case state[:client] do
      nil -> {:reply, {:error, :redis_not_connected}, state}
      client -> {:reply, Redix.command(client, ["GET", key]), state}
    end
  end

  def handle_cast({:set, key, value}, state) do
    Redix.command(state.client, ["SET", key, value])

    {:noreply, state}
  end

  def handle_cast({:del, key}, state) do
    Redix.command(state.client, ["DEL", key])

    {:noreply, state}
  end

  def handle_cast({:hset, key, valuepairs}, state) do
    Redix.command(state.client, Enum.concat(["HSET", key], valuepairs))

    {:noreply, state}
  end

  def handle_cast({:hincrby, key, field, amount}, state) do
    Redix.command(state.client, ["HINCRBY", key, field, amount])

    {:noreply, state}
  end

  def handle_cast({:hdel, key, field}, state) do
    Redix.command(state.client, ["HDEL", key, field])

    {:noreply, state}
  end

  def handle_cast({:publish, channel, message}, state) do
    Redix.command(state.client, ["PUBLISH", channel, message])

    {:noreply, state}
  end

  def set(key, value) do
    GenServer.cast(:local_redis_client, {:set, key, value})
  end

  def del(key) do
    GenServer.cast(:local_redis_client, {:del, key})
  end

  def hdel(key, field) do
    GenServer.cast(:local_redis_client, {:hdel, key, field})
  end

  def hset(key, value_pairs) when is_list(value_pairs) do
    GenServer.cast(:local_redis_client, {:hset, key, value_pairs})
  end

  def hset(key, field, value) do
    hset(key, [field, value])
  end

  def hincrby(key, field, amount) do
    GenServer.cast(:local_redis_client, {:hincrby, key, field, amount})
  end

  def hgetall(key) do
    {:ok, response} = GenServer.call(:local_redis_client, {:hgetall, key})

    response
    |> normalize_kv()
  end

  def hget(key, field) do
    {:ok, response} = GenServer.call(:local_redis_client, {:hget, key, field})

    response
    |> normalize_kv()
  end

  def get(key) do
    {:ok, response} = GenServer.call(:local_redis_client, {:get, key})

    response
  end

  def publish(channel, message) do
    GenServer.cast(:local_redis_client, {:publish, channel, message})
  end

  defp normalize_kv(l) do
    l
    |> Enum.chunk_every(2)
    |> Map.new(fn [k, v] -> {k, v} end)
  end
end
