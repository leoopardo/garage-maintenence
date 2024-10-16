import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useAuth } from "../contexts/useAuth";
import { useLogin } from "../services/auth/login";
import defaultTheme from "../themes/default";

export const Route = createFileRoute("/login")({
  component: Home,
});

function Home() {
  const { token } = useAuth();
  const router = useRouter();
  const { mutate } = useLogin();

  if (token) {
    router.navigate({ to: "/users" });
  }

  return (
    <Row gutter={[8, 8]} style={{ padding: 24, width: "100%", height: "100%" }}>
      <Col xs={{ span: 24 }} md={{ span: 14 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "20%",
            paddingRight: "20%",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <Row
            gutter={[8, 4]}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Col span={24}>
              <Typography.Title
                level={2}
                style={{ fontWeight: 700, margin: 0 }}
              >
                Bem-vindo
              </Typography.Title>
            </Col>
            <Col span={24} style={{ marginBottom: 16 }}>
              <Typography.Text style={{ fontWeight: 300 }}>
                Informe seus dados de acesso.
              </Typography.Text>
            </Col>
            <Divider />
          </Row>
          <Form
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={(values) => mutate(values)}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[{ required: true }]}
            >
              <Input size="large" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Senha"
              name={"password"}
              rules={[{ required: true }]}
            >
              <Input.Password size="large" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="">
              <Button
                data-testid="login"
                type="primary"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size="large"
                icon={<ArrowRightEndOnRectangleIcon width={24} />}
                htmlType="submit"
              >
                Acessar
              </Button>
            </Form.Item>
          </Form>
          <a href="http://localhost:9999/auth/google">
            <Button
              data-testid="google-auth"
              type="primary"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#4285F4",
              }}
              size="large"
            >
              Acessar com o google
            </Button>
          </a>
        </div>
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 10 }}
        style={{
          height: "100%",
          backgroundColor: defaultTheme.primary,
          borderRadius: 8,
        }}
      ></Col>
    </Row>
  );
}
