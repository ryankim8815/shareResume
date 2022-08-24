import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { eduService } from "../services/eduService";

const educationRouter = Router();

educationRouter.post("/", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const school = req.body.school;
    const major = req.body.major;
    const degree = req.body.degree;

    const newEdu = await eduService.addEdu({
      school,
      major,
      degree
    })
    res.status(201).json(newEdu);
  } catch (error) {
    next(error);
  }
});

// 등록된 Education 정보 수정하기
educationRouter.put("/users/:id", login_required, async function(req, res, next) {
  try {
    //URI로부터 사용자 id 추출
    const user_id = req.params.id;
    // body data로부터 업데이트할 Education 정보 추출
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const degree = req.body.degree ?? null;

    const toUpdate = { school, major, degree };

    //해당 사용자 아이디로 Education 정보를 db에서 찾아 업데이트함. 
    const updateEdu = await eduService.setEdu({user_id, toUpdate});

    res.status(200).json(updateEdu);
  } catch (error) {
    next (error);
  }
});

// 현재 사용자의 Education 정보 가져오기
educationRouter.get("/users/:id", login_required, async function(req, res, next) {
  try {
    const user_id = req.params.id;
    const currentEduInfo = await eduService.getEduInfo({ user_id });

    res.status(200).send(currentEduInfo);
  } catch (error) {
    next(error);
  }
});


export { educationRouter };