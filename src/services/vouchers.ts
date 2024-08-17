import { VoucherType, VoucherUsageMode } from "@/types/enums";

import api from "./httpRequests";
import omit from "lodash.omit";

export type Voucher = {
  id: string;
  name: string;
  description: string;
  code: string;
  type: VoucherType;
  value: number;
  duration: number;
  quantity: number;
  usageMode: VoucherUsageMode;
};

type CreateVouchersParams = {
  eventId: string;
  vouchers: Omit<Voucher, "id">[];
};

type UpdateVoucherParams = Voucher;

type DeleteVoucherParams = {
  eventId: string;
  voucherIds: string[];
};

export const getVouchers = async (eventId: string) => {
  const data = await api.get<{ quantity: number; voucher: Voucher }[]>(
    `events/${eventId}/vouchers`
  );
  return data.map((item) => {
    return {
      ...item.voucher,
      quantity: item.quantity,
    };
  });
};
export const createVouchers = async (body: CreateVouchersParams) => {
  return await api.post<CreateVouchersParams>(`vouchers`, { body });
};
export const updateVoucher = async (voucher: UpdateVoucherParams) => {
  return await api.put<UpdateVoucherParams>(`vouchers/${voucher.id}`, {
    body: omit(voucher, "id"),
  });
};
export const deleteVoucher = async (body: DeleteVoucherParams) => {
  return await api.delete<DeleteVoucherParams>(`vouchers`, { body });
};
