import express from 'express';
import * as controller from '../controller/memberController.js'

const router = express.Router();

router
    .post('/signup', controller.signupMember) //회원가입
    .post('/idcheck', controller.getIdCheck) //아이디중복체크
    .post('/login', controller.loginMember) //로그인
    .post('/mypage', controller.getMypage) //유저 이름 호출
    .post('/type', controller.getUserType) // 유저 타입 확인
    .post('/update', controller.updateMember) // 유저 정보 업데이트
    .post('/order', controller.getOrder) // 유저 정보 업데이트
    .post('/findid', controller.findId) // 유저 아이디 찾기
    .post('/findpwd', controller.findPwd) // 유저 아이디 찾기
    .post('/addressUpdate', controller.addressUp) // 카트 배송지 업데이트
    .post('/address', controller.getAddress) // 카트 배송지 조회

    export default router; 