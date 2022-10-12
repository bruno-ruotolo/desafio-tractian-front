import { Select } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import usersService from "../../services/usersService";

export default function SelectUsers({ setUserId, token }) {
  const { Option } = Select;
  const [users, setUsers] = useState([{ managers: [], employees: [] }]);
  const { managers, employees } = users;
  const allUsers = managers?.concat(employees);

  useEffect(() => {
    (async () => {
      try {
        const companies = await usersService.getAllUsers(token);
        setUsers(companies);
      } catch (error) {}
    })();
  }, [token]);

  const onChange = (value) => {
    setUserId(value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a owner"
      optionFilterProp="children"
      onChange={onChange}
      style={{
        width: 500,
        height: 30,
        marginTop: 20,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
      }}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {allUsers?.map((user) => {
        const { _id, name } = user;
        return (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        );
      })}
    </Select>
  );
}
