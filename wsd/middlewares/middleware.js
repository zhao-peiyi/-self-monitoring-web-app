import { send } from "../deps.js";

const logError = async(context, next) => {
    try {
        await next();
    } catch(e) {
        console.log(e);
    }
}

const serveStatic = async(context,next) => {
    if (context.request.url.pathname.startsWith('/static')) {
        const path = context.request.url.pathname.substring(7);
        await send( context, path, {root: `${Deno.cwd()}/static`});
    } else {
        await next();
    }
}

export { logError, serveStatic };
