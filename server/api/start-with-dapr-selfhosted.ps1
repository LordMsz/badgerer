dapr run `
    --app-id badgerer-api `
    --app-port 5001 `
    --dapr-http-port 5101 `
    --dapr-grpc-port 61001 `
    --config ../dapr/config/config.yaml `
    dotnet run