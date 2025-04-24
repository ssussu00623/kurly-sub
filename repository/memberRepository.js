import { db } from "./db.js";
/******************************
 * Signup : 회원가입 쿼리 
 ******************************/
export const signupMember = async (formData) => {
    const sql = `
    insert into member(id, pwd, name, phone, emailname, emaildomain, gender, address, detailaddress, zipcode, reg_date )
                values(?,?,?,?,?,?,?,?,?,?, now())
    `
    const values = [
        formData.id,
        formData.pwd,
        formData.name,
        formData.phone,
        formData.emailname,
        formData.emaildomain,
        formData.gender,
        formData.address,
        formData.detailaddress,
        formData.zipcode
    ];
    const [result, fields] = await db.execute(sql, values);
    return { "result_rows": result.affectedRows };
};
/******************************
 * Signup : 아이디 중복체크 쿼리 
 ******************************/
export const getIdCheck = async ({ id }) => {
    const sql = `select count(id) as result from member where id = ?;`;
    const [result, fields] = await db.execute(sql, [id])
    return result[0];
};
/******************************
 * Login : 로그인  
 ******************************/
export const loginMember = async ({ id, pwd }) => { // {id: 'test', pwd: '1234'}
    const sql = `
    select count(*) as result_rows from member
	where id = ? and pwd = ?;
    `;
    const [result] = await db.execute(sql, [id, pwd]);
    return result[0];
}

/******************************
 * Login : 로그인 유저 타입 확인 
 * 2025.02.25 - 김다희
 ******************************/
export const getUserType = async ({ id }) => {
    const sql = `
        select type from member where id = ?
    `;

    const [result] = await db.execute(sql, [id]);
    return result[0];
}

/******************************
 * Order : 이름, 핸드폰번호, 주소, 이메일
 ******************************/
export const getUserName = async ({ id }) => {
    const sql = `
        select name,
        id, 
        pwd,
        phone,
        zipcode,
        address,
        detailaddress,
        concat(emailname, emaildomain) as email
        from member where id = ?
    `;

    const [result] = await db.execute(sql, [id]);
    return result[0];
}
/****************************** 
 * mypage : 이름, 핸드폰번호, 주소, 이메일
 ******************************/
export const getMypage = async ({ id }) => {
    const sql = `
        select name,
        id, 
        pwd,
        phone,
        zipcode,
        address,
        detailaddress,
        emailname,
        emaildomain
        from member where id = ?
    `;

    const [result] = await db.execute(sql, [id]);
    return result[0];
}
/******************************
 * Find : 아이디찾기 
 ******************************/
export const findId = async ({ name, phone }) => {
    const sql = `
    select count(*) as result_rows from member
    where name = ? and phone = ?;
    `;
    const [result] = await db.execute(sql, [name, phone]);
    if (result[0].result_rows > 0) {
        const idSql = `
        select id from member
        where name = ? and phone = ?;
        `;
        const [idResult] = await db.execute(idSql, [name, phone]);
        return { success: true, id: idResult[0].id };  // 아이디 반환
    }
    return { success: false };  // 아이디를 찾지 못한 경우
}

/******************************
 * Find : 비밀번호찾기
 ******************************/
export const findPwd = async ({ id, phone, emailname, emaildomain }) => {
    const sql = `
    select count(*) as result_rows from member
    where id = ? and phone = ?;
    `;
    const [result] = await db.execute(sql, [id, phone]);

    if (result[0].result_rows > 0) {
        // 생성된 비밀번호를 데이터베이스에 업데이트
        const updateSql = `
        update member
        set pwd = LEFT(UUID(), 8)
        where id = ? and phone = ? AND emailname = ? AND emaildomain = ?;
        `;
        await db.execute(updateSql, [id, phone, emailname, emaildomain]);

        // 비밀번호 조회 쿼리
        const selectPwdSql = `
    SELECT pwd 
    FROM member 
    WHERE id = ? AND phone = ? AND emailname = ? AND emaildomain = ?;
`;
        const [pwdResult] = await db.execute(selectPwdSql, [id, phone, emailname, emaildomain]);


        // 업데이트된 비밀번호 반환
        return { success: true, pwd: pwdResult[0].pwd };
    }

    return { success: false };  // 아이디를 찾지 못한 경우
};

/******************************
 * MyPage : 비밀번호, 핸드폰번호, 주소, 이메일 수정
 ******************************/
export const updateMember = async (formData) => {

    const sql = `
        UPDATE member 
        SET 
            phone = ?, 
            emailname = ?, 
            emaildomain = ?, 
            pwd = ?, 
            address = ?, 
            detailaddress = ?, 
            zipcode = ?,
            name = ?
        WHERE id = ?
    `;
    const values = [
        formData.phone,
        formData.emailname,
        formData.emaildomain,
        formData.pwd,
        formData.address,
        formData.detailaddress,
        formData.zipcode,
        formData.name,
        formData.id
    ];
    const [result] = await db.execute(sql, values);

    return { result_rows: result.affectedRows };
};
/****************************** 
 * mypage : 주문목록 조회
 ******************************/
export const getOrder = async ({ id }) => {
    const sql = `  
        SELECT 
            id,
            pid,
            tid,
            qty,
            format(total_price, 0) as tid_total_price,
            total_price,
            left(odate, 10) as odate,
            odate as order_date, 
            brand,
            subject,
            concat('http://13.209.88.179:9000/',JSON_UNQUOTE(JSON_EXTRACT(upload_img, '$[0]'))) as upload_img
        FROM 
            order_details 
        WHERE 
            id = ?;
    `;

    const [result] = await db.execute(sql, [id]);
    return result;
}
/******************************
 * carts : 장바구니 주소 수정
 ******************************/

export async function addressUp(formData) {
    console.log("formData", formData);

    const sql = `
        UPDATE member 
        SET 
            address = ?, 
            detailaddress = ?, 
            zipcode = ?
        WHERE id = ?
    `;
    const values = [
        formData.address,
        formData.detailaddress,
        formData.zipcode,
        formData.id
    ];

    const [result] = await db.execute(sql, values);
    return { result_rows: result.affectedRows };
};
