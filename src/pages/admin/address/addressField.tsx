import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  Datagrid,
  ListContextProvider,
  Title,
  useGetMany,
  useListContext,
} from "react-admin";

export const AddressField = () => {
  const [filter, setFilters] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const sort: any = { field: "id", order: "DESC" };
  const { data } = useListContext();
  const ids = data?.map((i) => i.address_id);
  const { data: addressData }: any = useGetMany("addresses", { ids: ids });
  if (!addressData) return;
  return (
    <ListContextProvider
      // @ts-ignore
      value={{
        data: addressData || [],
        total: 0,
        page: 1,
        perPage: 10,
        setPage,
        setFilters,
        sort,
      }}
    >
      <div>
        <Title title="Book list" />

        <Datagrid>
          <TextField source="street" />
          <TextField source="city" />
          <TextField source="postal_code" />
        </Datagrid>
      </div>
    </ListContextProvider>
  );
};
