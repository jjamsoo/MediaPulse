'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Share2, Filter, TrendingUp, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { hotTrends, getSentimentEmoji, getSocialIcon, getEngagementBar } from "@/lib/mock-data";
import { useRealTimeUpdates, useSimulatedData } from "@/hooks/use-realtime";

export default function TodayHotPage() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('engagement');

  const { lastUpdate, isConnected, formatTime } = useRealTimeUpdates(5000);

  const { data: liveHotTrends } = useSimulatedData(
    hotTrends,
    (currentData) => {
      // Simulate real-time changes in engagement and sentiment
      return currentData.map(trend => ({
        ...trend,
        engagement: Math.min(100, Math.max(60, trend.engagement + (Math.random() - 0.5) * 4)),
        sentiment: Math.min(60, Math.max(20, trend.sentiment + (Math.random() - 0.5) * 6))
      }));
    },
    8000
  );



  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Today Hot</h1>
            <p className="text-sm text-muted-foreground">실시간 3시간</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden">
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="fashion">패션 디자인</SelectItem>
                    <SelectItem value="ad">광고·홍보</SelectItem>
                    <SelectItem value="consumer">소비자 트렌드</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="정렬" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">인기순</SelectItem>
                    <SelectItem value="growth">성장률순</SelectItem>
                    <SelectItem value="sentiment">감정순</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveHotTrends.map((trend, index) => (
                <div key={trend.keyword} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{trend.keyword}</h3>
                    <Badge variant="secondary">
                      {getSocialIcon(trend.source)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">인게이지먼트:</span>
                      <span className="text-xs font-mono">
                        {getEngagementBar(trend.engagement)} {trend.engagement}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Sentiment: {trend.sentiment} {getSentimentEmoji(trend.sentiment)}</span>
                      <span className="text-green-600">{trend.growth3h}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="전체 카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 카테고리</SelectItem>
                    <SelectItem value="fashion">패션 디자인</SelectItem>
                    <SelectItem value="ad">광고·홍보</SelectItem>
                    <SelectItem value="consumer">소비자 트렌드</SelectItem>
                    <SelectItem value="politics">시사·정치·세계 정치</SelectItem>
                    <SelectItem value="economy">경제</SelectItem>
                    <SelectItem value="influencer">인플루언서·스타</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="인기순" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">인기순</SelectItem>
                    <SelectItem value="growth">성장률순</SelectItem>
                    <SelectItem value="sentiment">감정순</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="3시간" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3h">3시간</SelectItem>
                    <SelectItem value="6h">6시간</SelectItem>
                    <SelectItem value="12h">12시간</SelectItem>
                    <SelectItem value="24h">24시간</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm">
                Alert 설정
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>키워드</TableHead>
                  <TableHead>인게이지먼트</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>소스</TableHead>
                  <TableHead>성장률(3h)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveHotTrends.map((trend, index) => (
                  <TableRow key={trend.keyword}>
                    <TableCell className="font-medium">{trend.keyword}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">
                          {getEngagementBar(trend.engagement)}
                        </span>
                        <span className="text-sm">{trend.engagement}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        {trend.sentiment} {getSentimentEmoji(trend.sentiment)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <i className={getSocialIcon(trend.source)}></i>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        {trend.growth3h}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Live Update Status */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">실시간 연결됨</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">연결 재시도 중...</span>
              </>
            )}
            <span className="text-muted-foreground ml-4">
              최종 업데이트: {formatTime(lastUpdate)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
