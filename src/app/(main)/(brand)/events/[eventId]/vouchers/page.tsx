"use client";
import { Edit, Loader, Ticket } from "lucide-react";
import QRCode from "qrcode.react";
import { useEffect, useMemo, useState } from "react";

import VoucherForm from "@/components/organisms/voucher-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  useCreateVouchers,
  useDeleteVoucher,
  useGetVouchers,
  useUpdateVoucher,
} from "@/hooks/react-query/useVouchers";
import { cn } from "@/lib/utils";
import formatDuration from "@/lib/utils/functions/formatDuration";
import { Voucher } from "@/services/vouchers";

export default function VouchersPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const [changeVoucherDialog, setChangeVoucherDialog] = useState(false);
  const [addVoucherDialog, setAddVoucherDialog] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { data, isLoading, isSuccess, isError } = useGetVouchers(eventId);
  const updateVoucherMutation = useUpdateVoucher(eventId);
  const createVouchersMutation = useCreateVouchers(eventId);
  const deleteVoucherMutation = useDeleteVoucher(eventId);

  const handleSaveAll = () => {
    const existingVouchers = vouchers.filter((voucher) => voucher.id);
    const newVouchers = vouchers.filter((voucher) => !voucher.id);
    const deletedVouchers = data?.filter(
      (voucher) => !vouchers.find((v) => v.id === voucher.id)
    );
    console.log(deletedVouchers);
    existingVouchers.forEach((voucher) => {
      updateVoucherMutation.mutate(voucher);
    });
    createVouchersMutation.mutate({
      eventId,
      vouchers: newVouchers,
    });
    deletedVouchers &&
      deleteVoucherMutation.mutate({
        eventId,
        voucherIds: deletedVouchers.map((voucher) => voucher.id),
      });
  };
  const handleVoucherChange = (data: Voucher) => {
    setVouchers((prev: Voucher[]) => {
      return prev.map((voucher) => (voucher.id === data.id ? data : voucher));
    });
    setChangeVoucherDialog(false);
  };
  const handleAddVoucher = (data: Voucher) => {
    setVouchers((prev: Voucher[]) => {
      return [...prev, data];
    });
    setAddVoucherDialog(false);
  };
  const handleDeleteVoucher = (data: Voucher) => {
    if (data.id) {
      console.log(data.id);
      setVouchers((prev: Voucher[]) => {
        return prev.filter((voucher) => voucher.id !== data.id);
      });
    } else {
      console.log("no id");
      setVouchers((prev: Voucher[]) => {
        return prev.filter((voucher) => voucher.code !== data.code);
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setVouchers(data);
    }
  }, [data]);

  const areDifferent = useMemo(
    () => JSON.stringify(vouchers) !== JSON.stringify(data),
    [vouchers, data]
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl my-4">Vouchers</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setVouchers(data ?? [])}>
            Reset
          </Button>
          <Button onClick={handleSaveAll} disabled={!areDifferent}>
            Save changes
          </Button>
        </div>
      </div>
      <Separator orientation="horizontal" className="w-full mb-8" />
      {isLoading && (
        <div className="grid place-items-center min-h-[350px]">
          <Loader className="animate-spin text-primary w-10 h-10" />
        </div>
      )}
      {isError && <div>Error</div>}
      <div className="flex flex-col gap-6">
        {vouchers.map((voucher, index) => (
          <Card key={index} className="pr-4 hover:shadow-lg overflow-hidden">
            <div className="flex items-center h-[150px]">
              <QRCode value={voucher.code} size={150} includeMargin={true} />
              <Separator orientation="vertical" />
              <div className="flex-1 w-full">
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">
                    {voucher.name}
                    <span className="text-muted-foreground text-sm ml-2 italic">
                      Duration: &nbsp;
                      {formatDuration(voucher.duration)}
                    </span>
                  </CardTitle>
                  <CardDescription>{voucher.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div>
                    <div
                      className={cn(
                        voucher.quantity < 50 ? "text-destructive" : " ",
                        "text-sm mb-2"
                      )}
                    >
                      Stock: {voucher.quantity}
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {voucher.usageMode}
                    </Badge>
                  </div>
                </CardContent>
              </div>
              <Button
                variant="ghost"
                className="p-2 size-10 rounded-full"
                onClick={() => {
                  setSelectedVoucher(voucher);
                  setChangeVoucherDialog(true);
                }}
              >
                <Edit size={16} />
              </Button>
            </div>
          </Card>
        ))}
        <Dialog
          onOpenChange={(open) => setChangeVoucherDialog(open)}
          open={changeVoucherDialog}
        >
          <DialogContent>
            <VoucherForm
              editMode={Boolean(selectedVoucher)}
              voucher={selectedVoucher ?? undefined}
              onSubmit={
                selectedVoucher ? handleVoucherChange : handleAddVoucher
              }
              onDelete={handleDeleteVoucher}
            />
          </DialogContent>
        </Dialog>
        <Button
          className="h-[10rem] w-full border border-dashed border-muted-foreground/50 bg-white text-muted-foreground inline-flex"
          variant="secondary"
          onClick={() => {
            setSelectedVoucher(null);
            setChangeVoucherDialog(true);
          }}
        >
          <Ticket size={24} className="mr-2" />
          Add a new voucher
        </Button>
      </div>
    </>
  );
}
