defmodule Exoix.Metrics do
  use Task, restart: :transient

  def start_link(_opts) do
    Task.start_link(fn ->
      Exoix.Metrics.Collector.start()
      exit(:normal)
    end)
  end
end
