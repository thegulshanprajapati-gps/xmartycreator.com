
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsCharts = dynamic(() => import('./charts').then(mod => mod.AnalyticsCharts), {
  ssr: false,
  loading: () => (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Page Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Link Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  ),
});

interface AnalyticsClientWrapperProps {
  pageVisitsData: { name: string; visits: number }[];
  linkClicksData: { name: string; clicks: number }[];
}

export function AnalyticsClientWrapper({ pageVisitsData, linkClicksData }: AnalyticsClientWrapperProps) {
  return (
    <AnalyticsCharts
      pageVisitsData={pageVisitsData}
      linkClicksData={linkClicksData}
    />
  );
}
