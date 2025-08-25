import { useGetShortenUrls } from "@/hooks/url/useGetShorenUrls";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ShortenUrls = () => {
  const { shortenUrls, isGettingShortenUrls } = useGetShortenUrls();

  if (isGettingShortenUrls) return <p>Loading...</p>;

  return (
    <Table>
      <TableCaption>A list of your shorten urls</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Long Url</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Short URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shortenUrls.map((shortenUrl) => (
          <TableRow>
            <TableCell key={shortenUrl.id}>{shortenUrl.longUrl}</TableCell>

            <TableCell key={shortenUrl.id}>{shortenUrl.slug}</TableCell>

            <TableCell key={shortenUrl.id}>
              {shortenUrl.title || "N/A"}
            </TableCell>

            <TableCell>
              <a
                target="_blank"
                className="text-blue-600 hover:underline"
                href={`http://localhost:5555/${shortenUrl.slug}`}
              >{`http://localhost:5555/${shortenUrl.slug}`}</a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
