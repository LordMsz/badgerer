dapr run `
    --app-id badgerer-image-generator `
    --app-port 5002 `
    --dapr-http-port 5102 `
    --dapr-grpc-port 61002 `
    --config ../dapr/config/config.yaml `
    --components-path ../dapr/components `
    -- `
    dotnet run