import Navbar from "@/components/costume/Navbar/Navbar";
import Beranda from "@/components/costume/beranda/Beranda";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const getBerita = async () =>{
  return (await axios(process.env.NEXT_PUBLIC_BASE_BERITA_URL)).data.data
}
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: getBerita,
    queryKey: ["berita"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
      <Beranda />
    </HydrationBoundary>
  );
}
