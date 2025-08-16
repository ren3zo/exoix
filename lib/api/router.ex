defmodule Exoix.Api.Router do
  import Plug.Conn

  alias Exoix.Api.Routes.V1
  alias Exoix.Api.Routes.Discord
  alias Exoix.Api.Routes.Metrics
  alias Exoix.Api.Util
  alias Exoix.Api.Quicklinks

  use Plug.Router

  @supported_quicktypes ["png", "gif", "webp", "jpg", "jpeg"]

  plug(Corsica,
    origins: "*",
    max_age: 600,
    allow_methods: :all,
    allow_headers: :all
  )

  plug(:match)
  plug(:dispatch)
  plug(:metrics_handle)

  def metrics_handle(conn, _opts) do
    stat =
      cond do
        conn.status >= 200 && conn.status < 300 ->
          :Exoix_2xx_responses

        conn.status >= 400 && conn.status < 500 ->
          :Exoix_4xx_responses

        conn.status >= 500 ->
          :Exoix_5xx_responses
      end

    Exoix.Metrics.Collector.inc(:counter, stat)

    conn
  end

  get "/" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, "priv/static/index.html")
  end

  get "/home" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, "priv/static/home.html")
  end

  get "/credits" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, "priv/static/credits.html")
  end

  get "/style.css" do
    conn
    |> put_resp_content_type("text/css")
    |> send_file(200, "priv/static/style.css")
  end

  get "/script.js" do
    conn
    |> put_resp_content_type("application/javascript")
    |> send_file(200, "priv/static/script.js")
  end

  get "/socket" do
    conn = %Plug.Conn{query_params: params} = fetch_query_params(conn)

    conn
    |> WebSockAdapter.upgrade(Exoix.SocketHandler, params, timeout: 60_000)
    |> halt()
  end

  forward("/v1", to: V1)
  forward("/discord", to: Discord)
  forward("/metrics", to: Metrics)

  get _ do
    quicktype = String.split(conn.request_path, ".") |> Enum.at(-1)

    cond do
      Enum.member?(@supported_quicktypes, quicktype) ->
        Quicklinks.DiscordCdn.proxy_image(conn)

      true ->
        Util.not_found(conn)
    end
  end

  options _ do
    conn
    |> send_resp(204, "")
  end

  match _ do
    Util.not_found(conn)
  end
end
