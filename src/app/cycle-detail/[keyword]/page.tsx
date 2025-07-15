import { mockTrends } from "@/lib/mock-data";
import CycleDetailClient from "./cycle-detail-client";

export async function generateStaticParams() {
  return mockTrends.map((trend) => ({
    keyword: encodeURIComponent(trend.keyword)
  }));
}

interface PageProps {
  params: Promise<{
    keyword: string;
  }>;
}

export default async function CycleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const keyword = decodeURIComponent(resolvedParams.keyword);

  return <CycleDetailClient keyword={keyword} />;
}
