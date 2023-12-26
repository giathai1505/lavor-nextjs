import Image from "next/image";
import React from "react";
import directorTreeImg from "@/assets/images/common/director-tree.webp";

const Part1 = () => {
  return (
    <div className="bg-black p-5 md:p-10 xl:p-16">
      <div className="wrapper text-base md:text-lg">
        <p className="text-white common-text text-justify xl:text-left">
          Lavor là một thương hiệu sản xuất nội thất ô tô, trực thuộc Công ty
          TNHH TMDV & SX Minh Tâm – chuyên gia trong lĩnh vực sản xuất nội thất,
          độ xe và dịch vụ lắp đặt nội thất ô tô tại Việt Nam. Chúng tôi cam kết
          luôn làm việc với tác phong chuyên nghiệp, chất lượng và đổi mới dù
          sản phẩm thuộc dòng trung hay cao cấp. <br></br> <br />
          Qua hơn 15 năm xây dựng và phát triển, trên 1.000 chủng loại sản phẩm
          được sản xuất với sản lượng 300.000 sản phẩm/năm, Lavor đang dần khẳng
          định vị thế của mình trên khắp thị trường Việt Nam. <br /> <br />
          Sản phẩm tại Lavor được “nuôi dưỡng” tinh tế từ khâu thiết kế, đến quá
          trình sản xuất chính xác trên hệ thống máy móc hiện đại bậc nhất từ
          Châu Âu và quy trình kiểm soát chất lượng khắt khe theo tiêu chuẩn ISO
          9001:2015. Từ đó, tạo ra sự phong phú về kiểu dáng, bảo vệ sức khỏe
          khi đi đường dài. <br />
          <br />
          Lavor được đánh giá là một nơi lý tưởng gần như đáp ứng mọi sự mong
          đợi của khách hàng từ phổ thông đến khác biệt, nhờ sự kết hợp cùng vị
          vua ngành da Mastrotto từ Ý và phụ liệu Amann hàng đầu từ Đức. Các sản
          phẩm của chúng tôi rất đa dạng như: Nệm ghế da ôtô, sàn xe, thảm lót
          chân, gối cổ, bọc tay lái. Lavor sở hữu đội ngũ chuyên gia và kĩ thuật
          viên giàu kinh nghiệm, các kĩ sư trưởng trên 30 năm tuổi nghề, luôn
          được đào tạo nâng cao nhằm đáp ứng tiêu chuẩn phức tạp và xu hướng
          tiêu dùng của thị trường nội địa và quốc tế. <br /> <br />
          Chúng tôi tự hào bởi rất nhiều sản phẩm nội thất ô tô của Lavor đã và
          đang trở thành người bạn đồng hành tin cậy trên mỗi chuyến đi của
          người dân Việt Nam thông qua các hãng xe nổi tiếng như: Toyota,
          Nissan, Hyundai, Ford, Honda,… <br /> Trong tương lai, Lavor phấn đấu
          trở thành thương hiệu sản xuất nội thất ô tô hàng đầu Việt Nam và đưa
          sản phẩm ra toàn Châu Á vào 5-10 năm tới.
        </p>
        <div className="flex justify-center mt-10">
          <Image
            alt="Sô đồ ban giám đốc"
            src={directorTreeImg}
            priority={true}
            className="rounded-xl border-[6px] border-solid border-primary xl:h-[400px] h-[200px] md:h-[350px] md:w-[600px] w-[350px] xl:w-[700px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Part1;
