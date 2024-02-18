import { Elysia } from "elysia";
import HomeController from "@/controllers/HomeController";
import MangaController from "@/controllers/MangaController";
import ReadController from "@/controllers/ChapterController";
import HistoryController from "@/controllers/HistoryController";
import BookmarkController from "@/controllers/BookmarkController";
import LoginController from "@/controllers/LoginController";
import BrowseController from "@/controllers/BrowseController";
import NotFoundPage from "@/views/pages/404";
import SearchController from "@/controllers/SearchController";
import TagController from "@/controllers/TagController";

const app = new Elysia();
const bookmark = new BookmarkController();
const login = new LoginController();
const browse = new BrowseController();
const search = new SearchController();
const tag = new TagController();

app.get("/", HomeController.welcome);

app.get("/home", HomeController.index);
app.get("/home/:page", HomeController.index);

app.get("/manga/:_slug/:id", MangaController.index);
app.get("/read", ReadController.index);

app.get("/history", HistoryController.index);
app.get("/bookmark", bookmark.index);

app.get("/login", login.index);
app.post("/login", login.login);

// app.all("/vulnerability", login.vulnerability); // This is a vulnerability test endpoint

app.get("/browse", browse.index);
app.get("/search-ajax", search.ajax);
app.get("/tag/:id", tag.index);

app.onError(({ code, set }) => {
  if (code !== "NOT_FOUND") set.status = "Not Found";

  set.headers["X-Robots-Tag"] = "noindex, follow";
  set.headers["Content-Type"] = "text/html; charset=utf8";

  return NotFoundPage;
});

export default app;
