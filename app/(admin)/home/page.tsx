import { Card, Statistic, Row, Col } from "antd";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">概览</h2>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="今日订单数" value={128} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="待处理工单" value={23} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="活跃设备" value={56} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="告警数量" value={3} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}


