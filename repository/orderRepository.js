import { db } from "./db.js";

/*************************************
        결제 성공시 주문내역 테이블에 값 insert
*************************************/

export const add = ({ qty, id, pid, total_price, tid }) => {
        const sql = `
                INSERT INTO orderlist (qty, id, pid, total_price, tid, odate)
                VALUES (?, ?, ?, ?, ?, NOW())
        `;
        return db.execute(sql, [qty, id, pid, total_price, tid]);
};




/*************************************
        order 페이지에서 주문 정보 가져오기
*************************************/
export const getOrderList = async ({ id, checkedItems }) => {

        if (!Array.isArray(checkedItems) || checkedItems.length === 0) {
                console.error("checkedItems 없음", checkedItems);
                return [];
        }

        const placeholders = checkedItems.map(() => "?").join(",");

        const sql = `
                SELECT * FROM view_cart_list
                WHERE id = ? AND no IN (${placeholders})
        `;

        // 배열 앞에 id 추가해서 SQL 실행함
        const [result] = await db.execute(sql, [id, ...checkedItems]);

        return result;


}


