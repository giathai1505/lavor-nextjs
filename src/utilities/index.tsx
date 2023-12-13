import { upLoadImages } from "@/api/imageAPI";
import { IAgencyTable, IRegion } from "@/types";
import { getSession, signOut, useSession } from "next-auth/react";

export function areObjectsEqual<T extends {}>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function formatCurrencyWithDots(number: number): string {
  const numberString = number.toString();
  const parts = numberString.split(".");
  const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedNumber =
    parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger;

  return formattedNumber;
}

export const checkAndUploadMultipleImage = async (
  files: Array<string | File>
): Promise<string[]> => {
  let needToUploadArr: File[] = [];
  let newListImages: string[] = [];

  files.forEach((item) => {
    if (typeof item !== "string") {
      needToUploadArr.push(item as File);
    }
  });

  if (needToUploadArr.length > 0) {
    const uploadImage = await upLoadImages(needToUploadArr);

    if (uploadImage.urls.length > 0) {
      let startIndex = 0;

      files.forEach((item) => {
        if (typeof item === "string") {
          newListImages.push(item);
        } else {
          newListImages.push(uploadImage.urls[startIndex]);
          startIndex++;
        }
      });
    }
  } else {
    return files as string[];
  }

  return newListImages;
};

export const convertToAgencyArray = (data: IRegion[]): IAgencyTable[] => {
  const result: IAgencyTable[] = [];

  data.forEach((region) => {
    region.cities.forEach((city) => {
      city.agencies.forEach((agency) => {
        const agencyData: IAgencyTable = {
          agency_id: agency.agency_id,
          agency_name: agency.agency_name,
          agency_address: agency.agency_address,
          city_name: city.city_name,
          region_name: region.region_name,
        };

        result.push(agencyData);
      });
    });
  });

  return result;
};

export const getTokenFromLocalStorage = async () => {
  const session = await getSession();

  if (session) {
    return session.user?.name;
  } else {
    signOut();
    return "";
  }
};
