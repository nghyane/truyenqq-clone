# quickstart

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
# or
pm2 start pm2.config.js
```

This project was created using `bun init` in bun v1.0.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


# Database Create

Create database without losing data

```bash
migrate dev --create-only
```


```
docker build -t test -f .docker/Dockerfile .
```
