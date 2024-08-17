import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createVouchers,
  deleteVoucher,
  getVouchers,
  updateVoucher,
  Voucher,
} from "@/services/vouchers";

import { useToast } from "../useToast";

const voucherKeys = {
  key: ["vouchers"] as const,
  detail: (eventId: string) => [...voucherKeys.key, eventId] as const,
};

export const useGetVouchers = (eventId: string) => {
  return useQuery({
    queryKey: voucherKeys.detail(eventId),
    queryFn: () => getVouchers(eventId),
  });
};

export const useCreateVouchers = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createVouchers,
    onSuccess: (returnData) => {
      queryClient.setQueryData(
        voucherKeys.detail(eventId),
        (prev: Voucher[]) => {
          return [...prev, ...returnData.vouchers];
        }
      );
      toast({
        description: "Vouchers created successfully!",
      });
    },
    onError: () => {
      toast({
        description: "Failed to create vouchers!",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateVoucher = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateVoucher,
    onSuccess: (returnData) => {
      queryClient.setQueryData(
        voucherKeys.detail(eventId),
        (prev: Voucher[]) => {
          return prev.map((voucher) => {
            return voucher.id === returnData.id ? returnData : voucher;
          });
        }
      );
      toast({
        description: "Voucher updated successfully",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update voucher",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteVoucher = (eventId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: deleteVoucher,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        voucherKeys.detail(eventId),
        (prev: Voucher[]) => {
          return prev.filter(
            (voucher) => !variables.voucherIds.includes(voucher.id)
          );
        }
      );
      toast({
        description: "Voucher deleted successfully!",
      });
    },
    onError: () => {
      toast({
        description: "Failed to delete voucher!",
        variant: "destructive",
      });
    },
  });
};
