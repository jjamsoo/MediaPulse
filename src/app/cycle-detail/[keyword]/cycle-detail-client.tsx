'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Download, Bell, BarChart3, Calendar, TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { timelineData, evidenceData } from "@/lib/mock-data";

interface CycleDetailClientProps {
  keyword: string;
}

export default function CycleDetailClient({ keyword }: CycleDetailClientProps) {
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const relatedKeywords = ['#Y2K', '#빈티지', '#서브컬처', '#패션리바이벌'];

  const marketImpactData = [
    { metric: '관련 브랜드 매출', value: '+23%', trend: 'up' },
    { metric: '신규 브랜드 출시', value: '15개/월', trend: 'up' },
    { metric: '검색광고 CPC', value: '+45%', trend: 'up' },
    { metric: '온라인 쇼핑몰 트래픽', value: '+67%', trend: 'up' }
  ];

  const keywordClusters = [
    { type: '핵심', keywords: ['#Y2K', '#빈티지', '#리바이벌'] },
    { type: '연관', keywords: ['#서브컬처', '#패션아이템'] },
    { type: '확장', keywords: ['#지속가능성', '#순환경제'] }
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
            <h1 className="text-2xl font-bold">Cycle Details: {keyword}</h1>
            <p className="text-sm text-muted-foreground">
              {timelineData.currentStatus} | 신뢰도: {timelineData.confidence}% | 예측 정확도: {timelineData.accuracy}%
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">현재 상태</div>
                <div className="font-medium">상승기</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">신뢰도</div>
                <div className="font-medium">{timelineData.confidence}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">예측 정확도</div>
                <div className="font-medium">{timelineData.accuracy}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm text-muted-foreground">다음 피크</div>
                <div className="font-medium">2026-02</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="impact">시장 영향</TabsTrigger>
          <TabsTrigger value="related">연관 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cycle Pattern Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>사이클 패턴 & 예측</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Timeline Visual */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-4">
                      {timelineData.cycles.map((cycle, index) => (
                        <div key={cycle.date} className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${cycle.type === 'predicted' ? 'bg-accent-400' : 'bg-primary-600'} mb-2`}></div>
                          <span className="text-xs font-medium">{cycle.date}</span>
                          <span className="text-xs text-muted-foreground text-center">{cycle.description}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-neutral-200 relative">
                      <div className="absolute right-1/4 top-0 h-px w-1/4 border-t-2 border-accent-400 border-dashed"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">주요 이벤트:</h4>
                    <div className="text-sm space-y-1">
                      <div>2012: 첫 번째 Y2K 리바이벌</div>
                      <div>2018: 인스타그램 중심 확산</div>
                      <div>2024: Z세대 메인스트림 진입</div>
                      <div className="text-accent-400">2026: 예측 피크 (신뢰도 89%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>• r (상관계수): {evidenceData.correlation}</div>
                    <div>• 유사도: {evidenceData.similarity}%</div>
                    <div>• 검색량 MoM: {evidenceData.searchMoM}</div>
                    <div>• 검색량 QoQ: {evidenceData.searchQoQ}</div>
                    <div className="col-span-2">• Sentiment: {evidenceData.sentiment} (Very Positive)</div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">소셜 미디어 지표:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• Instagram: {evidenceData.socialStats.instagram.toLocaleString()} posts/day</div>
                      <div>• TikTok: {evidenceData.socialStats.tiktok.toLocaleString()} videos/day</div>
                      <div>• YouTube: {evidenceData.socialStats.youtube} views/month</div>
                      <div>• X(Twitter): {evidenceData.socialStats.twitter.toLocaleString()} tweets/day</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News Headlines */}
          <Card>
            <CardHeader>
              <CardTitle>샘플 뉴스 헤드라인</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evidenceData.news.map((news, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">{news.title}</h4>
                      <p className="text-sm text-muted-foreground">({news.source}, {news.date})</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>상세 Evidence 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">통계적 지표</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>상관계수 (r):</span>
                      <span className="font-medium">{evidenceData.correlation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>유사도:</span>
                      <span className="font-medium">{evidenceData.similarity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>신뢰구간:</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>표준편차:</span>
                      <span className="font-medium">0.12</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">성장 지표</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>검색량 MoM:</span>
                      <span className="font-medium text-green-600">{evidenceData.searchMoM}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>검색량 QoQ:</span>
                      <span className="font-medium text-green-600">{evidenceData.searchQoQ}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sentiment 점수:</span>
                      <span className="font-medium text-green-600">+{evidenceData.sentiment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>추세 강도:</span>
                      <span className="font-medium">Strong</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>시장 영향 지표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketImpactData.map((item, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-green-600">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.metric}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>관련 키워드 클러스터</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywordClusters.map((cluster, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-2">• {cluster.type}:</h4>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {cluster.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={alertsEnabled ? "default" : "outline"}
          onClick={() => setAlertsEnabled(!alertsEnabled)}
          className="flex-1"
        >
          <Bell className="mr-2 h-4 w-4" />
          {alertsEnabled ? '알림 설정됨' : '피크 도달 시 알림'}
        </Button>
        <Button variant="outline" className="flex-1">
          <BarChart3 className="mr-2 h-4 w-4" />
          다른 사이클과 비교
        </Button>
        <Button variant="outline" className="flex-1">
          API 데이터 연동
        </Button>
      </div>
    </div>
  );
}
