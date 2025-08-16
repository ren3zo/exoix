defmodule Exoix.Api.Routes.V1 do
  alias Exoix.Api.Util
  alias Exoix.Api.Routes.V1.Users

  use Plug.Router

  plug(:match)
  plug(:dispatch)

  forward("/users", to: Users)

  match _ do
    Util.not_found(conn)
  end
end
