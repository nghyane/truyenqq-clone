import { VerifyContext } from "@/derives/VerifyToken";
import prisma from "@/services/prisma";

import HistoryPage from "@/views/pages/history";

const HistoryController = {
    index: async () => {

        return <HistoryPage />
    },
}

export default HistoryController;
