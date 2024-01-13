import prisma from "./prisma";
import { Genre } from "@prisma/client";

declare const global: GlobalContext;

interface GlobalContext {
    genres?: Genre[];
}

if (!global.genres) {
    global.genres = await prisma.genre.findMany({
        orderBy: {
            name: 'asc'
        }
    })
}

export default global;