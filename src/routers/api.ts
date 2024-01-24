import { Elysia } from 'elysia'
import ChapterController from '@/controllers/ChapterController'
import verifyToken from '@/derives/VerifyToken'
import BookmarkController from '@/controllers/BookmarkController'


const bookmarkController = new BookmarkController()


const api = new Elysia()

api.group('/api/v1', (app) => {
    app.get('/chapters', ChapterController.chapters)

   
    app.group('/user', (app) => {
        app.derive(verifyToken)
        
        app.post('/bookmark', bookmarkController.addBookmark)
        app.delete('/bookmark', bookmarkController.removeBookmark)
        app.get('/bookmark', bookmarkController.getBookmarkStatus)
        app.get('/bookmarks', bookmarkController.getBookmarks)
        return app;
    });


    return app;
})

export default api