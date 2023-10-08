import { faker } from "@faker-js/faker";

export type Person = {
  blog_id: string;
  blog_title: string;
  blog_description: number;
  blog_cover_image_url: number;
  category: "Về Lavor" | "Kiến thức & Mẹo" | "Tuyển dụng";
  upload_date: Date;
  blog_content: string;
  status: 0 | 1;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    blog_id: faker.string.uuid(),
    blog_title: faker.person.lastName(),
    blog_description: faker.number.int(40),
    blog_cover_image_url: faker.number.int(1000),
    category: faker.helpers.shuffle<Person["category"]>([
      "Về Lavor",
      "Kiến thức & Mẹo",
      "Tuyển dụng",
    ])[0]!,
    upload_date: faker.date.past(),
    blog_content: faker.internet.displayName(),
    status: faker.helpers.shuffle<Person["status"]>([0, 1])[0]!,
  };
};

export const makeData = (...lens: number[]) => {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
};
