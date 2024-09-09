import { VoucherType, VoucherUsageMode } from "@/types/enums";

import api from "./kyInstance";
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

export type EventVoucher = Voucher & {
  eventVoucherId: string;
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
  const data = (
    await api
      .get(`events/${eventId}/vouchers`)
      .json<{ data: { quantity: number; voucher: Voucher; id: string }[] }>()
  ).data;
  return data.map((item) => {
    return {
      ...item.voucher,
      quantity: item.quantity,
      eventVoucherId: item.id,
    };
  });
};

export const createVouchers = async (body: CreateVouchersParams) => {
  return (await api.post(`vouchers`, { json: body }).json<{ data: CreateVouchersParams }>()).data;
};

export const updateVoucher = async (voucher: UpdateVoucherParams) => {
  return (
    await api
      .put(`vouchers/${voucher.id}`, {
        json: omit(voucher, "id"),
      })
      .json<{ data: UpdateVoucherParams }>()
  ).data;
};
export const deleteVoucher = async (body: DeleteVoucherParams) => {
  return (await api.delete(`vouchers`, { json: body }).json<{ data: DeleteVoucherParams }>()).data;
};
