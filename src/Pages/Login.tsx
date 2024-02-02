import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    let response = await axios.post("/auth/login", { username, password });
    const data = response.data;
    if (data.isOk && !data.error) {
      toast("Success", { type: "success" });
      // Console : tokens
      // console.log("this is data", data);

      //Set Tokens in SessionStorage
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);

      //Get New AccessToken
      const getNewAccessToken = async () => {
        try {
          const response = await axios.post("/auth/refresh", {
            refreshToken: sessionStorage.getItem("refreshToken"),
          });
          const data = response.data;
          if (data.isOk && !data.error) {
            const newAccessToken = data.accessToken;
            // Yangi accessTokenni saqlash
            sessionStorage.setItem("accessToken", newAccessToken);
          } else {
            toast(data.error, { type: "warning" });
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getNewAccessToken();

      navigate("/admin/dashboard");
    } else {
      toast(data.message, { type: "warning" });
    }
    if (data.error) {
      toast(data.error, { type: "error" });
    }
  }

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  return (
    <div>
      <h4 className="login">Admin Login</h4>

      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        onFinish={handleLogin}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
