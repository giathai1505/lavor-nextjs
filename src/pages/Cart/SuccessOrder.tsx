import React from "react";
import { Button, Result } from "antd";

const App: React.FC = () => (
  <Result
    status="success"
    title="ĐẶT HÀNG THÀNH CÔNG!"
    subTitle="Đơn hàng sẽ được chuyển đến bộ phận quản lý và sẽ có nhân vui liên hệ đến quý khách sớm."
    extra={[
      <Button type="primary" key="console">
        Tiếp tục mua hàng
      </Button>,
    ]}
  />
);

export default App;
