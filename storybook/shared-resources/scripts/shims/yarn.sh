#!/bin/bash
set -e

# [YARN SHIM] Entrypoint for executing Yarn using a local Node.js setup
projectRoot="$(dirname "$0")/../../../"

mkdir -p "$projectRoot/logs"

echo "[YARN SHIM] Using local Yarn: $(dirname "$0")/yarn-1.22.19.cjs"
echo "[YARN SHIM] Args: $@" >> "$projectRoot/logs/yarn-shim.log"

if [[ "$1" == "npm" && "$2" == "info" ]]; then
  shift 2
  args="$@"

  if [[ "$args" == "storybook --fields version --json" ]]; then
    echo "{}"
    exit 0
  fi

  echo "[YARN SHIM] Redirecting to npm info npm info $args"
  npm info $args
  exit $?
fi

node "$(dirname "$0")/yarn-1.22.19.cjs" "$@"
