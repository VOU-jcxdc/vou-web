"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import useAddressSelects from "@/hooks/zustand/useAddressSelects";
import communes from "@/static-data/communes.json";
import district from "@/static-data/districts.json";
import province from "@/static-data/provinces.json";

export default function FormAddressPicker() {
  const { addressValues, setProvince, setDistrict, setCommune } =
    useAddressSelects();

  const districtsInProvince = district.filter(
    (dis) => dis.idProvince === addressValues.provinceId
  );
  const communesInDistrict = communes.filter(
    (com) => com.idDistrict === addressValues.districtId
  );

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setProvince(parsedValue.name, parsedValue.id);
          setDistrict("", "");
          setCommune("", "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              addressValues.province !== ""
                ? addressValues.province
                : "Chọn tỉnh"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tỉnh, thành</SelectLabel>
            {province.map((pro, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: pro.name, id: pro.idProvince })}
              >
                {pro.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={addressValues.provinceId === ""}
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setDistrict(parsedValue.name, parsedValue.id);
          setCommune("", "");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              addressValues.district !== ""
                ? addressValues.district
                : "Chọn quận"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quận, huyện</SelectLabel>
            {districtsInProvince.map((dis, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: dis.name, id: dis.idDistrict })}
              >
                {dis.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={addressValues.districtId === ""}
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setCommune(parsedValue.name, parsedValue.id);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              addressValues.commune !== ""
                ? addressValues.commune
                : "Chọn phường"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Phường, xã</SelectLabel>
            {communesInDistrict.map((com, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ name: com.name, id: com.idCommune })}
              >
                {com.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
