import prisma from "@/services/prisma";
import cron from "@elysiajs/cron";
import Elysia from "elysia";


const refreshViewCron = new Elysia()



refreshViewCron.use(
    cron({
    name: 'refreshViewDay',
    pattern: '0 0 0 * * *',
    async run() {
        await prisma.mangaView.updateMany({
            data: {
                viewsDay: 0,
            }
        })
    }
}))


refreshViewCron.use(cron({
    name: 'refreshViewWeek',
    pattern: '0 0 0 * * 0', // every week at 00:00:00
    async run() {
        await prisma.mangaView.updateMany({
            data: {
                viewsWeek: 0,
            }
        })
    }
}))

refreshViewCron.use(cron({
    name: 'refreshViewMonth',
    pattern: '0 0 0 1 * *', // every month at 00:00:00
    async run() {
        await prisma.mangaView.updateMany({
            data: {
                viewsMonth: 0,
            }
        })
    }
}))

export default refreshViewCron;

