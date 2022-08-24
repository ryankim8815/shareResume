import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEdu }) {
    const createdNewEdu = await EducationModel.create(newEdu);
    return createdNewEdu;
  }

  static async findByEmail({ email }) {
    const education = await EducationModel.findOne({ email });
    return education;
  }

  static async findById({ user_id }) {
    const user = await EducationModel.findOne({ id: user_id });
    return user;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateEdu = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateEdu;
  }
}

export { Education }