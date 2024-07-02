import * as React from "react";
import { useGetAllUsersQuery } from "@/store/UserSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSelectProps {
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

const UserSelect: React.FC<UserSelectProps> = ({
  defaultValue,
  onChange,
  className,
}) => {
  const { data, error, isLoading } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = React.useState<string | undefined>(
    defaultValue
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handleChange = (value: string) => {
    setSelectedUser(value);
    onChange(value);
  };

  const userOptions = data?.data.map((user) => (
    <SelectItem key={user._id} value={user._id}>
      {user.name}
    </SelectItem>
  ));

  // const defaultUserLabel = data?.data.find(user => user._id === defaultValue)?.name;

  return (
    <Select
      onValueChange={handleChange}
      value={selectedUser}
      defaultValue={defaultValue}
    >
      <SelectTrigger className={`min-w-[180px] ${className}`}>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          {userOptions}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
