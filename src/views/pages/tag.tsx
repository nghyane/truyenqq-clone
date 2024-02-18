import BaseHead from "../components/BaseHead";
import BaseBody from "../components/BaseBody";
import HomeFooter from "../components/HomeFooter";
import { mangaUrl } from "@/services/url";

type TagPageProps = {
  tag: {
    name: string;
  };
  mangas: {
    id: number;
    title: string;
    tags: {
      id: number;
      name: string;
    }[];
  }[];
};

const TagPage = (props: TagPageProps) => {
  const { tag, mangas } = props;

  return (
    <html>
      <BaseHead>
        <title safe>{tag.name}</title>
        <meta name="description" content={`Mangas with tag ${tag.name}`} />
      </BaseHead>
      <BaseBody>
        <div class="container mt-10">
          <h1 safe class="text-primary mb-3 text-3xl font-bold">
            #{tag.name}
          </h1>

          <ul class="flex list-disc flex-wrap gap-2">
            {mangas.map((manga) => (
              <li class="w-full">
                <a href={mangaUrl(manga)} title={manga.title} safe>
                  {manga.title}
                </a>

                <hr class="my-2" />
                <div class="flex flex-wrap gap-2">
                  {manga.tags.map((tag) => (
                    <a
                      href={`/tag/${tag.id}`}
                      title={tag.name}
                      class="bg-primary max-w-full overflow-hidden truncate rounded-md p-1 text-xs text-white"
                      safe
                    >
                      {tag.name}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <HomeFooter />

      </BaseBody>
    </html>
  );
};

export default TagPage;
