import { Select } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import companiesService from "../../services/companiesService";
import unitsService from "../../services/unitsService";

export default function SelectUnits({ setUnitId, token, companyId }) {
  const { Option } = Select;
  const [units, setUnits] = useState([{ _id: 0 }]);

  useEffect(() => {
    (async () => {
      try {
        const companies = await unitsService.getUnits(companyId, token);
        setUnits(companies);
      } catch (error) {}
    })();
  }, [companyId, token]);

  const onChange = (value) => {
    setUnitId(value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a unit"
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
      {units?.map((company) => {
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
