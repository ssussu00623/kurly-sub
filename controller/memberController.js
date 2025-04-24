import * as repository from '../repository/memberRepository.js'
import jwt from 'jsonwebtoken';


/******************************
 * Signup : 회원가입
 ******************************/
export const signupMember = async (req, res) => {
    const result = await repository.signupMember(req.body);
    res.json(result);
    res.end();
}
/******************************
 * Signup : 아이디 중복체크 
 ******************************/
export const getIdCheck = async (req, res) => {
    console.log('id==>', req.body);
    const result = await repository.getIdCheck(req.body);
    res.json(result)
    res.end();
}
/******************************
 * Login : 로그인 
 ******************************/
export const loginMember = async (req, res) => {
    console.log(req.body);
    let result = await repository.loginMember(req.body);
    if (result.result_rows === 1) {
        const token = jwt.sign({ "user_id": req.body.id }, 'ti96A2lqFU')
        result = { ...result, "token": token }
        console.log(result);
    }
    res.json(result)
    res.end();

}
/******************************
 * MyPage : 이름 호출
 ******************************/
export const getUserName = async (req, res) => {
    const result = await repository.getUserName(req.body);
    res.json(result);
    res.end();
};
/******************************
 * MyPage : 개인정보 호출
 ******************************/
export const getMypage = async (req, res) => {
    const result = await repository.getMypage(req.body);
    res.json(result);
    res.end();
};
/******************************
 * MyPage : 정보 변경
 ******************************/

// 유저 정보 업데이트 함수
export const updateMember = async (req, res) => {
    // console.log(req.body);

    const result = await repository.updateMember(req.body);
    res.json(result);
    res.end();
}
/******************************
 * MyPage : 주문내역 조회
 ******************************/
export const getOrder = async (req, res) => {
    try {
        const result = await repository.getOrder(req.body); // 주문 목록 가져오기
        res.json(result); // 배열 형태로 반환
    } catch (error) {
        console.error("주문 조회 실패:", error);
        res.status(500).json({ message: "주문 조회 실패" });
    }
};
/******************************
 * Find : 아이디 조회
 ******************************/
export const findId = async (req, res) => {
    const result = await repository.findId(req.body);
    res.json(result);
    res.end();
};
/******************************
 * Find : 비밀번호 조회
 ******************************/
export const findPwd = async (req, res) => {
    const result = await repository.findPwd(req.body);
    res.json(result);
    res.end();
};

/******************************
 * Login : 로그인 유저 타입 확인 
 * 2025.02.25 - 김다희
 ******************************/
export const getUserType = async (req, res) => {
    const result = await repository.getUserType(req.body);
    res.json(result);
    res.end();
};

/******************************
 * Carts 배송지 변경
 * 작성자 : 정서령
 ******************************/

export const addressUp = async (req, res) => {
    const result = await repository.addressUp(req.body);
    res.json(result);
    res.end();
};

/******************************
 * Carts 배송지 수정전 db 조회 -> getMypage 이용
 * 작성자 : 정서령
 ******************************/

export const getAddress = async (req, res) => {
    const result = await repository.getMypage(req.body);
    res.json(result);
    res.end();
};




