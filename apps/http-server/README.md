# http-server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


  docker run -d \
  --name postgres-db \
  -p 5432:5432 \
  -e POSTGRES_USER=subrat \
  -e POSTGRES_PASSWORD=subrat08 \
  -e POSTGRES_DB=mydb \
  postgres