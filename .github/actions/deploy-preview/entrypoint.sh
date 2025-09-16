#!/bin/bash

VERCEL_TOKEN=$1
VERCEL_ORG_ID=$2
VERCEL_PROJECT_ID=$3

npx vercel deploy \
  --token "$VERCEL_TOKEN" \
  --org-id "$VERCEL_ORG_ID" \
  --project-id "$VERCEL_PROJECT_ID" \
  --prod=false \
  --confirm
