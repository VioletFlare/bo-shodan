# Build

```
docker build --pull --rm -f "Dockerfile" -t boshodan:latest "."
```

# Run

Due to puppeteer madness, running with SYS_ADMIN level is mandatory.

Prod:

```
docker run -i --cap-add=SYS_ADMIN boshodan:latest 
```

Dev:

```
docker run -i --cap-add=SYS_ADMIN --env ENV_FLAG=--dev boshodan:latest 
```

# Extensions (optional)

This project uses docker ms-azuretools/vscode-docker extension for local development.

https://open-vsx.org/extension/ms-azuretools/vscode-docker