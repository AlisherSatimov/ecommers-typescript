import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const aToken: string | null = sessionStorage.getItem("accessToken");
  const rToken: string | null = sessionStorage.getItem("refreshToken");

  const navigate = useNavigate();

  //Handle Login
  const handleLogin = async () => {
    setLoading(true);
    let response = await axios.post("/auth/login", { username, password });
    const data = response.data;

    if (data.isOk && !data.error) {
      toast("Success", { type: "success" });

      //Set Tokens in SessionStorage
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);

      sessionStorage.setItem("currentPage", "dashboard");
      setLoading(false);
      navigate("/admin");
    } else {
      toast(data.message, { type: "warning" });
      setLoading(false);
    }

    if (data.error) {
      toast(data.error, { type: "error" });
      setLoading(false);
    }
  };

  //Get New AccessToken
  const getNewAccessToken = async () => {
    try {
      const response = await axios.post("/auth/refresh", {
        refreshToken: rToken,
      });
      const data = response.data;
      if (data.isOk && !data.error) {
        // Yangi accessTokenni saqlash
        sessionStorage.setItem("accessToken", data.accessToken);

        toast("New token received", { type: "success" });
        sessionStorage.setItem("currentPage", "dashboard");
        navigate("/admin");
      } else {
        toast(data.error, { type: "warning" });
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (rToken) {
    getNewAccessToken();
  }

  return (
    <div className="w-full mt-40">
      <Form
        name="normal_login"
        className="login-form w-1/2  mx-auto"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-blue-600 w-full"
          >
            {loading ? <Spin /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
