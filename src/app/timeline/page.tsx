'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Calendar, TrendingUp, Target } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { timelineData } from "@/lib/mock-data";

export default function TimelinePage() {
  const [selectedKeyword, setSelectedKeyword] = useState('레트로 패션');
  const [timeRange, setTimeRange] = useState('2024-2025');
  const [compareKeyword, setCompareKeyword] = useState('');

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
            <h1 className="text-2xl font-bold">Timeline View</h1>
            <p className="text-sm text-muted-foreground">트렌드 사이클 분석</p>
          </div>
        </div>
        <div className="hidden md:block">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">기간:</span>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2022-2023">2022-2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">키워드:</span>
              <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="레트로 패션">레트로 패션</SelectItem>
                  <SelectItem value="AI 에이전트">AI 에이전트</SelectItem>
                  <SelectItem value="친환경 백">친환경 백</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-medium">비교:</span>
              <Select value={compareKeyword} onValueChange={setCompareKeyword}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="친환경 백">친환경 백</SelectItem>
                  <SelectItem value="AI 에이전트">AI 에이전트</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm font-medium">레이어:</span>
              <Badge variant="outline">소셜미디어</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>사이클 분석: {selectedKeyword}</CardTitle>
              <div className="flex gap-4 text-sm">
                <span>상관계수: 0.84</span>
                <span>신뢰도: 89%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Timeline Visual */}
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  {timelineData.cycles.map((cycle, index) => (
                    <div key={cycle.date} className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${cycle.type === 'predicted' ? 'bg-accent-400' : 'bg-primary-600'} mb-2`}></div>
                      <span className="text-sm font-medium">{cycle.date}</span>
                      <span className="text-xs text-muted-foreground">{cycle.description}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-neutral-200 relative">
                  <div className="absolute right-1/4 top-0 h-px w-1/4 bg-dashed border-t-2 border-accent-400 border-dashed"></div>
                </div>
              </div>

              {/* Cycle Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">세부 데이터</h3>
                  <div className="space-y-3">
                    {timelineData.cycles.slice(0, 3).map((cycle, index) => (
                      <div key={cycle.date} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{cycle.date}:</span>
                          <Badge variant={cycle.type === 'predicted' ? 'secondary' : 'outline'}>
                            {cycle.type === 'predicted' ? '예측' : '실제'}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          {cycle.events.map((event, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>{event}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">소셜미디어 언급량</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Instagram</div>
                        <div className="text-lg font-bold">8.9K</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-sm text-muted-foreground">TikTok</div>
                        <div className="text-lg font-bold">5.6K</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-sm text-muted-foreground">YouTube</div>
                        <div className="text-lg font-bold">2.3M</div>
                      </div>
                      <div className="text-center p-3 border rounded">
                        <div className="text-sm text-muted-foreground">Twitter</div>
                        <div className="text-lg font-bold">3.1K</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">시장 영향</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>매출 증가:</span>
                          <span>+42%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>참여 브랜드:</span>
                          <span>28개</span>
                        </div>
                        <div className="flex justify-between">
                          <span>출시 제품:</span>
                          <span>120개</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-4">
        {timelineData.cycles.map((cycle, index) => (
          <Card key={cycle.date}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${cycle.type === 'predicted' ? 'bg-accent-400' : 'bg-primary-600'}`}></div>
                  {index < timelineData.cycles.length - 1 && (
                    <div className="w-px h-16 bg-neutral-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold">{cycle.date}</span>
                    <Badge variant={cycle.type === 'predicted' ? 'secondary' : 'outline'}>
                      {cycle.type === 'predicted' ? '▲ 예측' : '●'}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-2">{cycle.description}</h3>
                  <div className="space-y-1">
                    {cycle.events.map((event, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span>-</span>
                        <span>{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prediction Model Info */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <Badge variant="outline">예측 모델: ARIMA + Sentiment Analysis</Badge>
              <Badge variant="outline">신뢰구간: 95%</Badge>
            </div>
            <Button variant="outline" size="sm">
              CSV/JSON Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
