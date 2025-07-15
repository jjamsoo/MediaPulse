'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Send, User, Building, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [overallRating, setOverallRating] = useState(4);
  const [mostUseful, setMostUseful] = useState('실시간 업데이트');
  const [suggestions, setSuggestions] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [followUp, setFollowUp] = useState({
    updates: false,
    beta: false
  });

  const featureRatings = [
    { name: '트렌드 예측 정확도', rating: 4.1, maxRating: 5 },
    { name: '실시간 업데이트', rating: 4.7, maxRating: 5 },
    { name: '데이터 시각화', rating: 4.3, maxRating: 5 },
    { name: '사용자 인터페이스', rating: 4.0, maxRating: 5 },
    { name: '데이터 내보내기', rating: 3.8, maxRating: 5 }
  ];

  const improvementPriorities = [
    '더 많은 카테고리 추가',
    '예측 모델 정확도 향상',
    'API 성능 개선',
    '모바일 앱 출시',
    '알림 기능 추가'
  ];

  const usefulFeatures = [
    '트렌드 예측',
    '실시간 업데이트',
    '데이터 내보내기',
    '시각화'
  ];

  const renderStars = (rating: number, setRating?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating && setRating(star)}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Feedback submitted:', {
      overallRating,
      mostUseful,
      suggestions,
      email,
      department,
      company,
      followUp
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Feedback & Suggestions</h1>
          <p className="text-sm text-muted-foreground">서비스 개선을 위한 소중한 의견을 들려주세요</p>
        </div>
        <div className="ml-auto hidden md:block">
          <Button variant="outline" size="sm">
            Anonymous
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feedback Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle>전체 서비스 만족도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {renderStars(overallRating, setOverallRating)}
                  <span className="text-lg font-medium">({overallRating}/5)</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  이번 달 평균: ★★★★☆ (4.1)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Ratings */}
          <Card>
            <CardHeader>
              <CardTitle>기능별 평가</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureRatings.map((feature) => (
                  <div key={feature.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">• {feature.name}</span>
                      <div className="flex items-center gap-2">
                        {renderStars(Math.round(feature.rating))}
                        <span className="text-sm">({feature.rating})</span>
                      </div>
                    </div>
                    <Progress value={(feature.rating / feature.maxRating) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most Useful Feature */}
          <Card>
            <CardHeader>
              <CardTitle>가장 유용한 기능</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {usefulFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mostUseful"
                      value={feature}
                      checked={mostUseful === feature}
                      onChange={(e) => setMostUseful(e.target.value)}
                      className="rounded"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>상세 피드백</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="전반적으로 매우 만족합니다. 특히 실시간 트렌드 업데이트가 유용해요.
다만 몇 가지 개선사항이 있습니다:

1. 더 많은 업계 카테고리 (헬스케어, 교육, 금융 등)
2. 지역별 트렌드 분석 (한국, 미국, 유럽 등)
3. 경쟁사 트렌드 비교 기능
4. 알림 설정 (특정 키워드 급상승 시)

API 응답 속도도 조금 더 빨라지면 좋겠습니다."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground mt-2">
                {suggestions.length}/1000 글자
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>연락처 정보 (선택사항)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    이메일
                  </label>
                  <Input
                    type="email"
                    placeholder="user@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    부서
                  </label>
                  <Input
                    placeholder="마케팅팀"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4" />
                    회사
                  </label>
                  <Input
                    placeholder="ABC Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium mb-3 block">팔로우업:</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={followUp.updates}
                      onChange={(e) => setFollowUp(prev => ({ ...prev, updates: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">개선사항 업데이트 시 알림</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={followUp.beta}
                      onChange={(e) => setFollowUp(prev => ({ ...prev, beta: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">베타 기능 테스트 참여</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleSubmit} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              피드백 제출
            </Button>
            <Button variant="outline" className="flex-1">
              임시저장
            </Button>
            <Button variant="outline" className="flex-1">
              초기화
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>서비스 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.2</div>
                  <div className="text-sm text-muted-foreground">전체 평균</div>
                  {renderStars(4)}
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs w-2">{stars}</span>
                      <Star className="h-3 w-3 text-yellow-400" />
                      <Progress value={stars === 5 ? 45 : stars === 4 ? 35 : stars === 3 ? 15 : stars === 2 ? 3 : 2} className="h-2 flex-1" />
                      <span className="text-xs w-8">{stars === 5 ? '45%' : stars === 4 ? '35%' : stars === 3 ? '15%' : stars === 2 ? '3%' : '2%'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improvement Priorities */}
          <Card>
            <CardHeader>
              <CardTitle>개선 우선순위</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {improvementPriorities.map((priority, index) => (
                  <div key={priority} className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-muted-foreground">{index + 1}.</span>
                    <span>{priority}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>최근 업데이트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-blue-500 pl-3">
                  <div className="font-medium">실시간 업데이트 개선</div>
                  <div className="text-muted-foreground">2025.07.10</div>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <div className="font-medium">새로운 카테고리 추가</div>
                  <div className="text-muted-foreground">2025.07.05</div>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <div className="font-medium">API 성능 최적화</div>
                  <div className="text-muted-foreground">2025.06.28</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
