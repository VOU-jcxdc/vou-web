import { createFileRoute } from "@tanstack/react-router";

import { Edit, Loader, Ticket } from "lucide-react";
import QRCode from "qrcode.react";
import { useEffect, useMemo, useState } from "react";

import VoucherForm from "@/components/organisms/voucher-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

export const Route = createFileRoute("/_authenticated/_brand/events/$eventId/_$eventId/vouchers")({
  component: VouchersPage,
});

function VouchersPage() {
  const { eventId } = Route.useParams<{ eventId: string }>();
  const [changeVoucherDialog, setChangeVoucherDialog] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const { data, isLoading, isSuccess, isError } = useGetVouchers(eventId);
  const updateVoucherMutation = useUpdateVoucher(eventId);
  const createVouchersMutation = useCreateVouchers(eventId);
  const deleteVoucherMutation = useDeleteVoucher(eventId);

  const handleSaveAll = () => {
    const existingVouchers = vouchers.filter((voucher) => voucher.id);
    const newVouchers = vouchers.filter((voucher) => !voucher.id);
    const deletedVouchers = data?.filter((voucher) => !vouchers.find((v) => v.id === voucher.id));
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
    setChangeVoucherDialog(false);
  };
  const handleDeleteVoucher = (data: Voucher) => {
    if (data.id) {
      setVouchers((prev: Voucher[]) => {
        return prev.filter((voucher) => voucher.id !== data.id);
      });
    } else {
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
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-semibold">Vouchers</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setVouchers(data ?? [])}>
            Reset
          </Button>
          <Button onClick={handleSaveAll} disabled={!areDifferent}>
            Save changes
          </Button>
        </div>
      </div>
      <Separator orientation="horizontal" className="mb-8 w-full" />
      {isLoading && (
        <div className="grid min-h-[350px] place-items-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      {isError && <div>Error</div>}
      <div className="flex flex-col gap-6">
        {vouchers.map((voucher, index) => (
          <Card key={index} className="overflow-hidden pr-4 hover:shadow-lg">
            <div className="flex h-[150px] items-center">
              <QRCode value={voucher.code} size={150} includeMargin={true} />
              <Separator orientation="vertical" />
              <div className="w-full flex-1">
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">
                    {voucher.name}
                    <span className="ml-2 text-sm italic text-muted-foreground">
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
                        "mb-2 text-sm"
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
                className="size-10 rounded-full p-2"
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
        <Dialog onOpenChange={(open) => setChangeVoucherDialog(open)} open={changeVoucherDialog}>
          <DialogContent>
            <VoucherForm
              editMode={Boolean(selectedVoucher)}
              voucher={selectedVoucher ?? undefined}
              onSubmit={selectedVoucher ? handleVoucherChange : handleAddVoucher}
              onDelete={handleDeleteVoucher}
            />
          </DialogContent>
        </Dialog>
        <Button
          className="inline-flex h-[10rem] w-full border border-dashed border-muted-foreground/50 bg-white text-muted-foreground"
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
