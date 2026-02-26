import { useState } from "react";
import type { MenuProps } from "antd";

const useRootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleComplete = (nextCollapsed: boolean): void => {
    setCollapsed(nextCollapsed);
  };

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  return {
    collapsed,
    handleComplete,
    searchValue,
    handleSearchChange,
    openKeys,
    handleOpenChange,
  };
};

export default useRootLayout;
