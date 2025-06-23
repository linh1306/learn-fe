"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Shield, Cloud, BarChart3 } from "lucide-react"

export default function Services() {
  const servicePackages = [
    {
      id: 1,
      name: "Gói Cơ bản",
      price: 99000,
      duration: "tháng",
      popular: false,
      icon: <Zap className="h-6 w-6" />,
      description: "Phù hợp cho cá nhân và doanh nghiệp nhỏ",
      features: ["5GB lưu trữ", "Hỗ trợ email", "Báo cáo cơ bản", "SSL miễn phí", "Backup hàng tuần"],
    },
    {
      id: 2,
      name: "Gói Premium",
      price: 299000,
      duration: "tháng",
      popular: true,
      icon: <Star className="h-6 w-6" />,
      description: "Lựa chọn phổ biến cho doanh nghiệp vừa",
      features: [
        "50GB lưu trữ",
        "Hỗ trợ 24/7",
        "Báo cáo nâng cao",
        "SSL miễn phí",
        "Backup hàng ngày",
        "API không giới hạn",
        "Tích hợp bên thứ 3",
      ],
    },
    {
      id: 3,
      name: "Gói Enterprise",
      price: 599000,
      duration: "tháng",
      popular: false,
      icon: <Shield className="h-6 w-6" />,
      description: "Giải pháp toàn diện cho doanh nghiệp lớn",
      features: [
        "Lưu trữ không giới hạn",
        "Hỗ trợ ưu tiên 24/7",
        "Báo cáo tùy chỉnh",
        "SSL nâng cao",
        "Backup thời gian thực",
        "API không giới hạn",
        "Tích hợp tùy chỉnh",
        "Quản lý người dùng",
        "Bảo mật nâng cao",
      ],
    },
  ]

  const additionalServices = [
    {
      name: "Cloud Storage",
      price: 50000,
      duration: "tháng",
      icon: <Cloud className="h-5 w-5" />,
      description: "Lưu trữ đám mây bổ sung",
      unit: "10GB",
    },
    {
      name: "Analytics Pro",
      price: 150000,
      duration: "tháng",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Phân tích dữ liệu chuyên sâu",
      unit: "Không giới hạn",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gói dịch vụ</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chọn gói dịch vụ phù hợp với nhu cầu của bạn. Tất cả gói đều bao gồm hỗ trợ kỹ thuật và cập nhật miễn phí.
          </p>
        </div>

        {/* Gói dịch vụ chính */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {servicePackages.map((pkg) => (
            <Card key={pkg.id} className={`relative ${pkg.popular ? "border-blue-500 border-2" : ""}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">Phổ biến nhất</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">{pkg.icon}</div>
                </div>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{formatCurrency(pkg.price)}</span>
                  <span className="text-gray-600">/{pkg.duration}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${pkg.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Chọn gói này
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dịch vụ bổ sung */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dịch vụ bổ sung</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {additionalServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">{service.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">{formatCurrency(service.price)}</span>
                      <span className="text-gray-600">/{service.duration}</span>
                      <p className="text-sm text-gray-500">{service.unit}</p>
                    </div>
                    <Button variant="outline">Thêm vào giỏ</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cần tư vấn?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn chọn gói dịch vụ phù hợp nhất với nhu cầu kinh doanh.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Liên hệ tư vấn</Button>
              <Button variant="outline">Xem demo</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
