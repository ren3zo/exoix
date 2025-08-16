FROM elixir:1.14-alpine

RUN apk add git redis

ENV MIX_ENV=prod

WORKDIR /app

# Install hex and rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Copy mix files first for better caching
COPY mix.exs mix.lock ./

# Get dependencies
RUN mix deps.get

# Copy the rest of the application
COPY . .

# Compile the application
RUN mix compile

# Expose the port
EXPOSE 4001

# Start the application
CMD ["mix", "run", "--no-halt"]
