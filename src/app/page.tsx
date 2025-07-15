'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, TrendingUp, Calendar, BarChart, Flame } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { todayTrend, categories, evidenceData, getSentimentEmoji, scenarioPlanning, trendEvolution } from "@/lib/mock-data";

export default function Home() {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredCategories = selectedCategory === '전체'
    ? categories
    : categories.filter(cat => cat.name.includes(selectedCategory.replace(' ', '')));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
        {/* Newsletter Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-sm mb-4">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-gray-800">MediaPulse Daily</span>
            <span className="text-sm text-gray-500">2025-07-15</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">오늘의 트렌드 레터</h1>
          <p className="text-gray-600">AI가 예측하는 다음 사이클과 그 근거를 확인하세요</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">카테고리 선택:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체 카테고리</SelectItem>
                    <SelectItem value="패션">패션 디자인</SelectItem>
                    <SelectItem value="광고">광고·홍보</SelectItem>
                    <SelectItem value="소비자">소비자 트렌드</SelectItem>
                    <SelectItem value="정치">시사·정치·세계정치</SelectItem>
                    <SelectItem value="경제">경제</SelectItem>
                    <SelectItem value="스타">인플루언서·스타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trend Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">🔥</div>
                  <div>
                    <h2 className="text-2xl font-bold">{todayTrend.keyword}</h2>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mt-1">
                      다음 피크 ▲ {todayTrend.nextPeak}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                💡 Why it matters?
              </h3>
              <p className="leading-relaxed text-white/90">
                {todayTrend.whyMatters}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Cycle Analysis */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              📈 AI 사이클 분석 & 예측 근거
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* 분석 방법론 설명 */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold mb-2 text-blue-800">🔬 분석 방법론</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                레트로 패션은 <strong>6년 주기</strong>로 반복되는 패턴을 보입니다. 과거 데이터 분석 결과,
                <strong>2012년</strong>과 <strong>2018년</strong>에 큰 피크를 기록했으며, 각각 Y2K 리바이벌과 인스타그램 중심의 확산이 주요 원인이었습니다.
              </p>
            </div>

            {/* 사이클 시각화 */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-gray-800">📊 트렌드 사이클 타임라인</h4>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  {[
                    { year: 2012, type: 'past', event: '첫 번째 Y2K 리바이벌', detail: '빈티지 브랜드 재출시' },
                    { year: 2018, type: 'past', event: '인스타그램 확산', detail: '인플루언서 마케팅 붐' },
                    { year: 2024, type: 'current', event: 'Z세대 메인스트림 진입', detail: 'TikTok 바이럴 확산' },
                    { year: 2026, type: 'predicted', event: '다음 피크 예측', detail: 'Gen Alpha 유입 예상' }
                  ].map((cycle, index) => (
                    <div key={cycle.year} className="flex flex-col items-center text-center max-w-[120px]">
                      <div className={`w-6 h-6 rounded-full mb-2 ${
                        cycle.type === 'predicted'
                          ? 'bg-orange-500 animate-pulse shadow-lg'
                          : cycle.type === 'current'
                          ? 'bg-green-500 shadow-lg'
                          : 'bg-blue-500'
                      }`}>
                        {cycle.type === 'predicted' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>}
                        {cycle.type === 'current' && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>}
                      </div>
                      <span className="text-sm font-bold mb-1">{cycle.year}</span>
                      <span className="text-xs font-medium text-gray-700 mb-1">{cycle.event}</span>
                      <span className="text-xs text-gray-500">{cycle.detail}</span>
                    </div>
                  ))}
                </div>

                {/* 연결선과 진행 바 */}
                <div className="relative h-3 bg-gray-200 rounded-full mb-4 mx-8">
                  <div className="absolute left-0 w-3/4 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                  <div className="absolute right-0 w-1/4 h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 right-1/4 w-px h-full bg-white"></div>
                </div>

                <div className="flex justify-center">
                  <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                    현재 위치: 상승기 후반 ⚡ 다음 피크까지 약 1.5년
                  </Badge>
                </div>
              </div>
            </div>

            {/* 예측 근거 */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold mb-3 text-green-800">🎯 2026년 피크 예측 근거</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">📈 데이터 기반 근거</h4>
                  <ul className="space-y-1 text-green-600">
                    <li>• 검색량 월간 증가율: <strong>+18%</strong></li>
                    <li>• 소셜미디어 언급 급증: <strong>TikTok +156%</strong></li>
                    <li>• 과거 사이클과 상관관계: <strong>r=0.84</strong></li>
                    <li>• Z세대 관심도 지속 상승</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">🧠 AI 모델 분석</h4>
                  <ul className="space-y-1 text-green-600">
                    <li>• ARIMA 예측 모델 신뢰도: <strong>89%</strong></li>
                    <li>• 감정 분석 점수: <strong>+42 (Very Positive)</strong></li>
                    <li>• 브랜드 출시 패턴 분석</li>
                    <li>• 세대 교체 사이클 반영</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 현재 상황 분석 */}
            <div className="mb-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-semibold mb-2 text-amber-800">⚡ 현재 상황 (2024-2025)</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                <strong>가속화 구간</strong>에 진입했습니다. 과거 사이클보다 <strong>2년 빠른</strong> 패턴을 보이며,
                이는 소셜미디어의 영향으로 트렌드 확산 속도가 빨라졌기 때문입니다.
                현재 대형 브랜드들의 Y2K 컬렉션 출시와 Gen Alpha의 초기 관심 유입이 확인되고 있어
                예측된 시나리오와 일치하고 있습니다.
              </p>
            </div>

            <Collapsible open={evidenceOpen} onOpenChange={setEvidenceOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium">📊 상세 Evidence 데이터</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${evidenceOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{evidenceData.correlation}</div>
                    <div className="text-xs text-gray-600">상관계수 (r)</div>
                    <div className="text-xs text-gray-500 mt-1">과거 패턴 일치도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{evidenceData.similarity}%</div>
                    <div className="text-xs text-gray-600">유사도</div>
                    <div className="text-xs text-gray-500 mt-1">AI 모델 신뢰도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{evidenceData.searchMoM}</div>
                    <div className="text-xs text-gray-600">검색량 MoM</div>
                    <div className="text-xs text-gray-500 mt-1">월간 성장률</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">+{evidenceData.sentiment}</div>
                    <div className="text-xs text-gray-600">Sentiment</div>
                    <div className="text-xs text-gray-500 mt-1">긍정 감정 지수</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href={`/cycle-detail/${encodeURIComponent(todayTrend.keyword)}`}>
                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                      전체 사이클 상세 분석 보기 →
                    </Button>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle>📊 {selectedCategory === '전체' ? '전체' : selectedCategory} 카테고리 현황</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium">카테고리</th>
                    <th className="text-center p-4 font-medium">호감도</th>
                    <th className="text-center p-4 font-medium">성장률</th>
                    <th className="text-center p-4 font-medium">감정지수</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.emoji}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          category.sentiment >= 40 ? 'bg-green-100 text-green-800' :
                          category.sentiment >= 30 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          ★ {(category.sentiment / 10).toFixed(1)}
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-600">{category.growth}</span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        <span className="text-lg">
                          {category.sentiment} {getSentimentEmoji(category.sentiment)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle>📰 주요 뉴스 헤드라인</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {evidenceData.news.map((news, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
                    <p className="text-sm text-gray-600">{news.source} • {news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scenario Planning Section */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              🎯 시나리오플래닝: {scenarioPlanning.targetDate} 예측
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* 방법론 설명 */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <h3 className="font-semibold mb-2 text-indigo-800">🧭 {scenarioPlanning.methodology} 방법론</h3>
              <p className="text-sm text-indigo-700 leading-relaxed">
                <strong>6개월 후 ({scenarioPlanning.targetDate})</strong> 레트로 패션 트렌드 시나리오를 3가지로 분석했습니다.
                과거 사이클 패턴과 현재 신호를 종합하여 <strong>신뢰도 {scenarioPlanning.confidence}%</strong>로 예측합니다.
              </p>
            </div>

            {/* 시나리오 3가지 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {scenarioPlanning.scenarios.map((scenario) => (
                <div key={scenario.id} className={`p-4 rounded-lg border-2 ${scenario.bgColor} ${scenario.borderColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-semibold ${scenario.color}`}>{scenario.name}</h4>
                    <Badge variant="outline" className={scenario.color}>
                      {scenario.probability}%
                    </Badge>
                  </div>
                  <p className="text-sm mb-3 text-gray-700">{scenario.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-1">🎯 예상 키워드</h5>
                      <div className="flex flex-wrap gap-1">
                        {scenario.keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs bg-white rounded px-2 py-1 text-gray-600">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-1">📱 핵심 채널</h5>
                      <div className="text-xs text-gray-600">
                        {scenario.channels.join(' · ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 트렌드 진화 패턴 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-800">🔄 트렌드 진화 패턴 분석</h3>

              {/* 과거 사이클 비교 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {trendEvolution.cycles.map((cycle, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <h4 className="text-sm font-medium mb-2 text-blue-800">{cycle.period}</h4>
                    <div className="text-xs space-y-2">
                      <div>
                        <span className="font-medium text-gray-600">특징:</span>
                        <div className="text-gray-500">
                          {cycle.characteristics.join(', ')}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">채널:</span>
                        <div className="text-gray-500">
                          {cycle.channels.join(', ')}
                        </div>
                      </div>
                      {cycle.evolution && (
                        <div className="space-y-1">
                          <div className="flex gap-1">
                            <span className="text-red-500 text-xs">❌</span>
                            <span className="text-xs text-gray-500">{cycle.evolution.removed.join(', ')}</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-blue-500 text-xs">🔄</span>
                            <span className="text-xs text-gray-500">{cycle.evolution.evolved.join(', ')}</span>
                          </div>
                          <div className="flex gap-1">
                            <span className="text-green-500 text-xs">✅</span>
                            <span className="text-xs text-gray-500">{cycle.evolution.added.join(', ')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 2026년 예측 진화 */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold mb-3 text-gray-800">🚀 2026년 예측 진화 (현실적 시나리오 기준)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-red-600 mb-2">❌ 사라질 요소</h5>
                    <ul className="space-y-1 text-red-500">
                      {scenarioPlanning.scenarios[1].evolution.removed.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">🔄 진화할 요소</h5>
                    <ul className="space-y-1 text-blue-500">
                      {scenarioPlanning.scenarios[1].evolution.evolved.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">✅ 새로 추가될 요소</h5>
                    <ul className="space-y-1 text-green-500">
                      {scenarioPlanning.scenarios[1].evolution.added.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 아이템 */}
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold mb-4 text-yellow-800">⚡ 단계별 액션 플랜</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarioPlanning.actionItems.map((phase, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <h4 className="font-medium mb-2 text-yellow-700">{phase.timeline}</h4>
                    <ul className="space-y-1 text-sm">
                      {phase.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-500 text-xs mt-1">•</span>
                          <span className="text-gray-600">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-0">
            <h3 className="text-xl font-bold text-gray-900 mb-4">더 자세한 분석이 필요하신가요?</h3>
            <p className="text-gray-600 mb-6">실시간 트렌드부터 상세 사이클 분석까지 모든 인사이트를 확인하세요</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/today-hot" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <BarChart className="mr-2 h-5 w-5" />
                  실시간 트렌드 보기
                </Button>
              </Link>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                  트렌드 탐색하기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>📧 이 레터가 도움이 되셨나요? <Link href="/feedback" className="text-blue-500 hover:underline">피드백 남기기</Link></p>
          <p className="mt-2">MediaPulse • AI 기반 트렌드 예측 플랫폼</p>
        </div>
      </div>
    </div>
  );
}
