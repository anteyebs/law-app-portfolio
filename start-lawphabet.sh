#!/bin/bash
# Starts both lawphabet servers (API + frontend) with one command.
# Ctrl+C stops both cleanly.

cd ~/projects/lawphabet || { echo "Project folder not found at ~/projects/lawphabet"; exit 1; }

# Kill both background processes if this script exits or is interrupted
cleanup() {
  echo "Stopping servers..."
  kill "$API_PID" "$WEB_PID" 2>/dev/null
}
trap cleanup EXIT INT TERM

echo "Starting API server on port 3001..."
PORT=3001 pnpm --filter api-server dev &
API_PID=$!

echo "Starting frontend on port 5173..."
PORT=5173 BASE_PATH=/ pnpm --filter lawphabet dev &
WEB_PID=$!

echo ""
echo "Both servers starting. Open http://localhost:5173 once ready."
echo "Press Ctrl+C to stop both."
echo ""

wait
