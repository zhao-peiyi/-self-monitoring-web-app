import { Application, Session, viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { logError, serveStatic } from "./middlewares/middleware.js";
import { router } from "./routes/routes.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {  viewRoot: './views' }));

const session = new Session({ framework: 'oak'});
await session.init();
app.use(session.use()(session));

app.use(logError);
app.use(serveStatic);

app.use(router.routes());

app.listen({ port: 7777 });
