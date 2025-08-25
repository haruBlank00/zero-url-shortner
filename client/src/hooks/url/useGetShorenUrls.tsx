import { getShortUrls } from "@/services/api/url";
import { useQuery } from "@tanstack/react-query";

export const useGetShortenUrls = () => {
  const query = useQuery({
    queryKey: ["shorten-urls"],
    queryFn: async () => getShortUrls(),
  });

  return {
    shortenUrls: query.data?.data || [],
    isGettingShortenUrls: query.isFetching,
    query,
  };
};
