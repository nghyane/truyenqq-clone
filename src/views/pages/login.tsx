import { BaseHead } from "../components/BaseHead";
import { BaseBody } from "../components/BaseBody";
import localize from "@/languages";

const LoginPage = () => (
  <html
    lang={process.env.APP_LANG}
    class="overflow-y-scoll h-auto min-h-full  w-full"
  >
    <BaseHead>
      <title safe>{localize("login")}</title>
      <meta name="robots" content="noindex, nofollow" />
    </BaseHead>

    <BaseBody>
      <div class="container mx-auto mt-8 max-w-lg bg-white p-16 px-12 lg:rounded lg:shadow">
        <div class="flex flex-col items-center gap-4">
          <h1 class="mb-8 text-center text-xl font-semibold">Welcome back!</h1>
        </div>

        <form class="mx-auto flex flex-col gap-4" id="login-form">
          <div class="flex flex-col gap-1">
            <input
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              class="rounded bg-gray-100 p-3 text-sm"
            />
          </div>

          <div class="flex flex-col gap-1">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              class="rounded bg-gray-100 p-3 text-sm"
            />
          </div>

          <div class="flex flex-row  justify-between ">
            <div class="flex flex-row gap-1">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                class="rounded bg-gray-100 p-3 text-sm"
              />
              <label for="remember" class="text-sm">
                Remember me
              </label>
            </div>

            <div class="flex flex-row gap-1">
              <label for="remember" class="text-primary text-sm">
                Forgot password?
              </label>
            </div>
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <div class="flex flex-col">
              <button
                type="submit"
                class="bg-primary rounded px-4 py-2 text-sm text-white"
              >
                Login
              </button>
            </div>

            <div class="flex flex-col">
              <button
                type="submit"
                class="rounded bg-red-500 px-4 py-2 text-sm text-white"
              >
                Login with Google
              </button>
            </div>
          </div>

          {/* // you don't have an account? register here */}
          <div class="mt-4 flex flex-col text-center">
            <span class="text-sm">
              <span>Don't have an account? </span>
              <a href="/register" class="text-primary">
                Register here
              </a>
            </span>
          </div>
        </form>
      </div>
    </BaseBody>

    <script src="/public/js/user.js"></script>
  </html>
);

export default LoginPage;
