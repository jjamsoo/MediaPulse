'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Mail, Link2, Calendar, FileText, Image, Database, HelpCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ExportPage() {
  const [selectedDatasets, setSelectedDatasets] = useState(['레트로 패션']);
  const [exportFormat, setExportFormat] = useState('json');
  const [filename, setFilename] = useState('retro_fashion_trend_20250715');
  const [includeData, setIncludeData] = useState({
    searchVolume: true,
    socialMentions: true,
    sentiment: true,
    predictions: true,
    evidence: true
  });

  const availableDatasets = [
    '레트로 패션 (2024-2025)',
    'AI 에이전트 (2024-2025)',
    '친환경 백 (2024-2025)',
    '메타버스 패션 (2024-2025)',
    'K-뷰티 글로벌 (2024-2025)'
  ];

  const categories = ['패션', '광고', '소비자', '정치', '경제', '스타'];

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel 호환)', icon: FileText, description: 'Excel에서 바로 열 수 있는 형식' },
    { value: 'json', label: 'JSON (API 형식)', icon: Database, description: '개발자 친화적 형식' },
    { value: 'pdf', label: 'PDF (보고서)', icon: FileText, description: '프레젠테이션용 보고서' },
    { value: 'png', label: 'PNG (차트 이미지)', icon: Image, description: '시각화 이미지' },
    { value: 'xml', label: 'XML', icon: Database, description: '구조화된 데이터 형식' }
  ];

  const handleDatasetToggle = (dataset: string) => {
    setSelectedDatasets(prev =>
      prev.includes(dataset)
        ? prev.filter(d => d !== dataset)
        : [...prev, dataset]
    );
  };

  const handleDataToggle = (key: keyof typeof includeData) => {
    setIncludeData(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
            <h1 className="text-2xl font-bold">Export Data</h1>
            <p className="text-sm text-muted-foreground">트렌드 데이터 내보내기</p>
          </div>
        </div>
        <div className="hidden md:block">
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dataset Selection */}
          <Card>
            <CardHeader>
              <CardTitle>선택된 데이터 세트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedDatasets.map((dataset) => (
                    <Badge key={dataset} variant="secondary" className="flex items-center gap-1">
                      ✓ {dataset}
                      <button
                        onClick={() => handleDatasetToggle(dataset)}
                        className="ml-1 hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">사용 가능한 데이터셋:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableDatasets.map((dataset) => (
                      <div
                        key={dataset}
                        className={`p-2 border rounded cursor-pointer text-sm ${selectedDatasets.includes(dataset) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                        onClick={() => handleDatasetToggle(dataset)}
                      >
                        {dataset}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">카테고리 필터:</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="cursor-pointer">
                        ✓{cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div>
                    <label className="text-sm font-medium">시작일</label>
                    <Input type="date" defaultValue="2024-01-01" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">종료일</label>
                    <Input type="date" defaultValue="2025-12-31" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>내보내기 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={exportFormat} onValueChange={setExportFormat}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                  {formatOptions.map((format) => (
                    <TabsTrigger key={format.value} value={format.value} className="text-xs">
                      {format.label.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {formatOptions.map((format) => (
                  <TabsContent key={format.value} value={format.value} className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <format.icon className="h-4 w-4" />
                      <span className="font-medium">{format.label}</span>
                      <span className="text-muted-foreground">- {format.description}</span>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">포함할 데이터:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(includeData).map(([key, checked]) => (
                    <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleDataToggle(key as keyof typeof includeData)}
                        className="rounded"
                      />
                      <span>{
                        key === 'searchVolume' ? '검색량 데이터' :
                        key === 'socialMentions' ? '소셜미디어 언급' :
                        key === 'sentiment' ? 'Sentiment 점수' :
                        key === 'predictions' ? '예측 데이터' :
                        'Evidence 근거'
                      }</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">추가 설정:</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    헤더 포함
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    메타데이터 포함
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    압축 (ZIP)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    암호화
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Settings */}
          <Card>
            <CardHeader>
              <CardTitle>파일 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">파일 이름:</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-muted-foreground">
                      .{exportFormat}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">크기 예상:</span>
                    <div className="font-medium">2.3 MB</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">레코드 수:</span>
                    <div className="font-medium">15,420</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">예상 시간:</span>
                    <div className="font-medium">15초</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>미리보기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                <div>Date,Keyword,Search...</div>
                <div>2024-01-01,레트로패션...</div>
                <div>2024-01-02,레트로패션...</div>
                <div>2024-01-03,레트로패션...</div>
                <div className="text-muted-foreground">...</div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>다운로드 옵션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                즉시 다운로드
              </Button>

              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                이메일 발송
              </Button>

              <Button variant="outline" className="w-full">
                <Link2 className="mr-2 h-4 w-4" />
                API 엔드포인트 생성
              </Button>

              <div className="pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">고급 옵션:</h4>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    정기 내보내기 설정
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Webhook 완료 알림
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle>이메일 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="team@company.com" />
                <Textarea placeholder="추가 메시지 (선택사항)" rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
