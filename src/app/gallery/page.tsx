'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Grid3X3, List, Settings, Eye, BarChart3, TrendingUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { mockTrends, getSentimentEmoji, getEngagementBar } from "@/lib/mock-data";

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [sortBy, setSortBy] = useState('인기순');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);

  const handleTrendSelect = (keyword: string) => {
    setSelectedTrends(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const filteredTrends = mockTrends.filter(trend =>
    trend.keyword.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === '전체' || trend.category.includes(categoryFilter.replace(' ', '')))
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
            <h1 className="text-2xl font-bold">Trend Gallery</h1>
            <p className="text-sm text-muted-foreground">트렌드 시각화 갤러리</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="키워드..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="패션">패션 디자인</SelectItem>
                <SelectItem value="광고">광고·홍보</SelectItem>
                <SelectItem value="소비자">소비자 트렌드</SelectItem>
                <SelectItem value="정치">시사·정치·세계정치</SelectItem>
                <SelectItem value="경제">경제</SelectItem>
                <SelectItem value="스타">인플루언서·스타</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="인기순">인기순</SelectItem>
                <SelectItem value="최신순">최신순</SelectItem>
                <SelectItem value="성장률순">성장률순</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hidden md:inline-flex">
              큰 보기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {filteredTrends.map((trend) => (
            <Card
              key={trend.keyword}
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedTrends.includes(trend.keyword) ? 'ring-2 ring-primary-600' : ''}`}
              onClick={() => handleTrendSelect(trend.keyword)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{trend.keyword}</span>
                  {selectedTrends.includes(trend.keyword) && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Engagement Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">인게이지먼트</span>
                      <span className="text-xs font-medium">{trend.engagement}%</span>
                    </div>
                    <div className="text-xs font-mono">
                      {getEngagementBar(trend.engagement)}
                    </div>
                  </div>

                  {/* Next Peak */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">다음 피크</span>
                    <Badge variant="secondary" className="bg-accent-400 text-white">
                      {trend.nextPeak} ▲
                    </Badge>
                  </div>

                  {/* Category and Sentiment */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{trend.category}</span>
                    <span>
                      Sentiment {trend.sentiment} {getSentimentEmoji(trend.sentiment)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {filteredTrends.map((trend) => (
                <div
                  key={trend.keyword}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedTrends.includes(trend.keyword) ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => handleTrendSelect(trend.keyword)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${selectedTrends.includes(trend.keyword) ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                    <div>
                      <h3 className="font-medium">{trend.keyword}</h3>
                      <p className="text-sm text-muted-foreground">{trend.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">인게이지먼트</div>
                      <div className="text-sm font-medium">{trend.engagement}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">다음 피크</div>
                      <div className="text-sm font-medium">{trend.nextPeak}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Sentiment</div>
                      <div className="text-sm font-medium">{trend.sentiment} {getSentimentEmoji(trend.sentiment)}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Trends Actions */}
      {selectedTrends.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">선택된 트렌드:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedTrends.map((trend) => (
                    <Badge key={trend} variant="secondary">
                      {trend}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  선택 비교
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  관심목록 추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
