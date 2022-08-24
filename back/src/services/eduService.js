import { User, Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class eduService {
  static async addEdu({ school, major, degree }) {
        
    const id = uuidv4();

    const newEdu = { id, school, major, degree };

    // db에 저장
    const createdNewEdu = await Education.create({ newEdu });

    return createdNewEdu;
  }

  static async setEdu({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      updateEdu = await Education.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      uupdateEduer = await Education.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      updateEdu = await Education.update({ user_id, fieldToUpdate, newValue });
    }

    return updateEdu;
  }

  static async getEduInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { eduService };