#!/bin/sh

# Set default port if not provided
export PORT=${PORT:-4001}

# Start the application
exec mix run --no-halt
