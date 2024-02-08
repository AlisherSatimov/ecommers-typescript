import { Card, Col } from "antd";

interface CardProps {
  title: string;
  value: number;
}

const DashCard = (props: CardProps) => {
  return (
    <Col span={8} className="mb-5">
      <Card title={props.title} bordered={false}>
        {props.value}
      </Card>
    </Col>
  );
};

export default DashCard;
