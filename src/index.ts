import { server } from './server/server';

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
