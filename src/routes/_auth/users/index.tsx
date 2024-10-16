import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { baseRequestI } from "../../../services/__interfaces/baseRequest.interface";
import { useListUsers } from "../../../services/users/listUsers";
import { Badge, Col, Row, Table, Typography } from "antd";

export const Route = createFileRoute("/_auth/users/")({
  component: Users,
});
function Users() {
  const [params, setParams] = useState<baseRequestI>({ limit: 15, page: 1 });
  const { data } = useListUsers(params);

  return (
    <Row gutter={[8, 8]} style={{ padding: 24, width: "100%" }}>
      <Col span={24}>
        <Typography.Title>Usuários</Typography.Title>
      </Col>

      <Col span={24}>
        <Table
          style={{ width: "100%" }}
          columns={[
            { title: "Nome", dataIndex: "name", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            {
              title: "Status",
              dataIndex: "isLoggedIn",
              key: "isLoggedIn",
              render: (isLoggedIn: "online" | "offline" | "absent") => {
                switch (isLoggedIn) {
                  case "online":
                    return <Badge status="success" text="Online" />;

                  case "absent":
                    return <Badge status="warning" color="orange" text="Ausente" />;

                  default:
                    return <Badge status="error" color="red" text="Offline" />;
                }
              },
            },
          ]}
          dataSource={data?.data}
        />
      </Col>
    </Row>
  );
}
