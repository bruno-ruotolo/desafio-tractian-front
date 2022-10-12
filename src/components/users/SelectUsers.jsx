import { Select } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

import companiesService from "../../services/companiesService";

export default function SelectUsers({ setCompanyId, token }) {
  const { Option } = Select;

  const [companies, setCompanies] = useState([{ _id: 0 }]);

  useEffect(() => {
    (async () => {
      try {
        const companies = await companiesService.getUserCompanies(token);
        setCompanies(companies);
      } catch (error) {}
    })();
  }, [token]);

  function onChange(value) {
    setCompanyId(value);
  }

  return (
    <Select
      showSearch
      placeholder="Select a company"
      optionFilterProp="children"
      onChange={onChange}
      style={{
        width: 500,
        height: 30,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
      }}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {companies?.map((company) => {
        const { _id, name } = company;
        return (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        );
      })}
    </Select>
  );
}
