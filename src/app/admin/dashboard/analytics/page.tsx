
import fs from 'fs/promises';
import path from 'path';
import { Eye, Users, MousePointerClick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsClientWrapper } from './analytics-client-wrapper';


async function getAnalyticsData() {
  try {
    const filePath = path.join(process.cwd(), 'src/content/analytics.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return {
        pageViews: data.pageViews || {},
        linkClicks: data.linkClicks || {}
    }
  } catch (error) {
    console.error("Failed to read analytics data:", error);
    // Return default structure if file doesn't exist or is invalid
    return { pageViews: {}, linkClicks: {} };
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  
  const pageVisitsData = Object.entries(data.pageViews)
    .map(([name, visits]) => ({ name, visits: visits as number }))
    .sort((a, b) => b.visits - a.visits);

  const linkClicksData = Object.entries(data.linkClicks)
    .map(([name, clicks]) => ({ name, clicks: clicks as number }))
    .sort((a, b) => b.clicks - a.clicks);

  const totalVisits = pageVisitsData.reduce((acc, curr) => acc + curr.visits, 0);
  const uniquePageCount = pageVisitsData.length;
  const totalLinkClicks = linkClicksData.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Website Analytics</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Pages Visited</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniquePageCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total number of tracked pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Link Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLinkClicks.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">Across all tracked links</p>
          </CardContent>
        </Card>
      </div>

      <AnalyticsClientWrapper
        pageVisitsData={pageVisitsData}
        linkClicksData={linkClicksData}
      />
    </>
  );
}
