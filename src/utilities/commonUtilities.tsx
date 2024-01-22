import { IAgencyTable, IRegion } from "@/types/type";
import { getSession, signOut } from "next-auth/react";

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

export const getListImageUpload = (files: Array<string | File>) => {
  let needToUploadArr: File[] = [];

  files.forEach((item) => {
    if (typeof item !== "string") {
      needToUploadArr.push(item as File);
    }
  });

  return needToUploadArr;
};

export const mapImageList = (
  original: Array<string | File>,
  newImages: string[]
) => {
  let newListImages: string[] = [];
  let startIndex = 0;

  original.forEach((item) => {
    if (typeof item === "string") {
      newListImages.push(item);
    } else {
      newListImages.push(newImages[startIndex]);
      startIndex++;
    }
  });

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
    return session.user?.access_token;
  } else {
    signOut();
    return "";
  }
};

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const indexArray = (length: number, gap: number = 1): number[] => {
  return new Array(length).fill(null).map((_, index) => (index + 1) * gap);
};


export const getNestedHeadings = (headingElements: any) => {
  const nestedHeadings: any = [];

  headingElements.forEach((heading: any, index: any) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};