"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Package, Plus } from "lucide-react";
import {
  useApiGetBalance,
  useApiGetTransactionHistory,
} from "@/api/balance/balance";
import { Container } from "@/components/app/container";

export default function Dashboard() {
  const { data: balance } = useApiGetBalance({
    query: {
      select: (data) => data.data,
    },
  });

  const { data: transactions } = useApiGetTransactionHistory({
    query: {
      select: (data) => data.data ?? [],
    },
  });
  const servicePackages = [
    {
      name: "Gói Premium",
      balance: 850000,
      status: "active",
      expiry: "2024-12-31",
    },
    {
      name: "Gói Cloud Storage",
      balance: 120000,
      status: "active",
      expiry: "2024-11-15",
    },
    {
      name: "Gói Analytics",
      balance: 0,
      status: "expired",
      expiry: "2024-06-01",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">Đang hoạt động</Badge>
        );
      case "expired":
        return <Badge variant="destructive">Hết hạn</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Hoàn thành</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Container>
      <Container.Header>header</Container.Header>
      <Container.Content className="flex flex-col gap-3">
        {/* Số dư tài khoản */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Số dư tài khoản
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(balance?.balance)}
              </div>
              <p className="text-xs text-muted-foreground">Số dư khả dụng</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gói đang hoạt động
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Gói dịch vụ</p>
            </CardContent>
          </Card>
        </div>
        {/* Số dư gói dịch vụ */}
        <Card>
          <CardHeader>
            <CardTitle>Gói dịch vụ đã đăng ký</CardTitle>
            <CardDescription>
              Theo dõi số dư và trạng thái các gói dịch vụ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servicePackages.map((pkg, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {getStatusBadge(pkg.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Số dư:</span>
                        <span className="font-semibold">
                          {formatCurrency(pkg.balance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hết hạn:</span>
                        <span className="text-sm">{pkg.expiry}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Nạp thêm
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Lịch sử giao dịch */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử giao dịch</CardTitle>
            <CardDescription>Danh sách các giao dịch gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã GD</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>{" "}
      </Container.Content>
    </Container>
  );
}
