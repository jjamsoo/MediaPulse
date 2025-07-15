'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, TrendingUp, Sparkles, Flame, Zap, Leaf, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { risingTrends, newTrends, recommendedKeywords, categories } from "@/lib/mock-data";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categoryProgress = [
    { name: '패션', progress: 80, color: 'bg-purple-500' },
    { name: '광고', progress: 60, color: 'bg-blue-500' },
    { name: '소비자', progress: 70, color: 'bg-green-500' },
    { name: '정치', progress: 40, color: 'bg-orange-500' },
    { name: '경제', progress: 50, color: 'bg-red-500' },
    { name: '스타', progress: 80, color: 'bg-pink-500' }
  ];

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
            <h1 className="text-2xl font-bold">Explore Trends</h1>
            <p className="text-sm text-muted-foreground">트렌드 탐색 및 분석</p>
          </div>
        </div>
        <div className="hidden md:block">
          <Button variant="outline" size="sm">
            Advanced
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="키워드 입력..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button size="sm" variant="ghost" className="text-primary-600">
                🔍
              </Button>
              <Button size="sm" variant="ghost" className="text-primary-600 hidden md:inline-flex">
                AI 추천
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">카테고리 필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['전체', '패션디자인', '광고·홍보', '소비자트렌드', '시사·정치·세계정치', '경제', '인플루언서·스타'].map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="mt-4 hidden md:block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">기간:</span>
              <div className="flex gap-2">
                {['1일', '1주', '1개월', '3개월', '1년'].map((period) => (
                  <Badge key={period} variant="outline" className="cursor-pointer">
                    {period}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">정렬:</span>
              <div className="flex gap-2">
                {['인기순', '최신순', '성장률순'].map((sort) => (
                  <Badge key={sort} variant="outline" className="cursor-pointer">
                    {sort}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Recommended Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">추천 검색어</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendedKeywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="cursor-pointer hover:bg-accent-400 hover:text-white">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rising Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">인기 상승 중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {risingTrends.map((trend, index) => (
                <div key={trend.keyword} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">② {trend.keyword}</span>
                    <span className="text-lg">{trend.emoji}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    {trend.growth}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">새로 등장</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {newTrends.map((trend, index) => (
                <div key={trend} className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">② {trend}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Trend Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">카테고리별 트렌드 맵</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryProgress.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">[{cat.name}]</span>
                  <span className="text-sm text-muted-foreground">{cat.progress}%</span>
                </div>
                <Progress value={cat.progress} className="h-2" />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full md:w-auto">
              <MapPin className="mr-2 h-4 w-4" />
              인터랙티브 맵 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
