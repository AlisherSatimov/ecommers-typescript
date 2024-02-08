import { PaginationProps } from "../interface/interface";
import { Pagination } from "antd";
import React from "react";

const PaginationComponent: React.FC<PaginationProps> = ({
  total,
  pageSize,
  current,
  onChange,
}) => {
  return (
    <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
      <Pagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationComponent;
